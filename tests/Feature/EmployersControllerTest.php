<?php

use App\Models\Employer;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

const BASE_URL = '/employers';

beforeEach(function () {
    $this->recruiter = User::factory()->create();
    $this->recruiter->role()->associate(
        Role::factory()->create(["title" => "Recruiter"])
    );
});

// Employer -> Create
describe('Create Employer', function () {

    it('creates and returns the entry', function () {
        $data = [
            'name' => 'Doe Corp',
            'initials' => 'DC',
            'foreground' => '#ffffff',
            'background' => '#000000',
            /*'logo_url' => '' // optional */
        ];

        $response = actingAs($this->recruiter)->postJson(
            BASE_URL,
            $data
        );

        $response->assertCreated() // Response 201
            ->assertJson(fn ($json) => $json->has('entry.id')); // contains entry.id

        $this->assertDatabaseHas('employers', $data);

    });

    it('rejects the request if invalid data is submitted', function (array $data, array $errors) {
        $response = actingAs($this->recruiter)->postJson(
            BASE_URL,
            $data
        );

        $response->assertUnprocessable()
            ->assertJsonValidationErrors($errors);
    })
        ->with([
            # Scenario #1 empty required field
            [
                # data
                [
                    'name' => '', // empty name
                    'initials' => 'DC',
                    'foreground' => '#ffffff',
                    'background' => '#000000'
                ],

                #errors
                ['name']
            ],
            # Scenario #2 using wrong color format
            [
                # data
                [
                    'name' => 'Employer Name',
                    'initials' => 'EN',
                    'foreground' => 'blue', // using color format other than hex-color
                    'background' => 'rgb(0,0,0)', // using color format other than hex-color
                    'logo_url' => '/path/to/file/not-a-link.png' // using string that is not a link
                ],

                #errors
                ['foreground', 'background', 'logo_url']
            ],
            # Scenario #3 missing required field
            [
                # data
                [
                    'name' => 'Employer Name',
                    // 'initials' => '', // missing initials
                    'foreground' => '#ffffff',
                    'background' => '#000000'
                ],

                #errors
                ['initials']
            ],
        ]);

    it('rejects the request if user is not logged in', function () {
        $data = [
            'name' => 'Doe Corp',
            'initials' => 'DC',
            'foreground' => '#ffffff',
            'background' => '#000000',
            /*'logo_url' => '' // optional */
        ];

        $response = $this->postJson(
            BASE_URL,
            $data
        );

        $this->assertGuest();
        $response->assertUnauthorized();
    });

    it('rejects the request if user is not a recruiter', function () {
        $data = [
            'name' => 'Doe Corp',
            'initials' => 'DC',
            'foreground' => '#ffffff',
            'background' => '#000000',
            /*'logo_url' => '' // optional */
        ];

        $response = actingAs(User::factory()->create())->postJson(
            BASE_URL,
            $data
        );

        $this->assertAuthenticated();
        $response->assertForbidden();
    });
});

describe('Read Employers', function () {

    it('returns empty entries key for authorized user with no employers', function () {
        $response = actingAs($this->recruiter)->getJson(BASE_URL);

        $response->assertOk()
            ->assertJson([
                'entries' => []
            ]);
    });

    it('returns all entries for authorized user', function () {
        $this->recruiter->employers()->saveMany(
            Employer::factory(5)->create()
        );

        $response = actingAs($this->recruiter)->getJson(BASE_URL);

        $response->assertOk()
            ->assertJson([
                'entries' => $this->recruiter->employers()->get()->toArray()
            ]);
    });

    it('returns entry found for given ID', function () {
        $employer = Employer::factory()->create();
        $this->recruiter->employers()->save($employer);

        $response = actingAs($this->recruiter)->getJson(url(BASE_URL, $employer->id));

        $response->assertOk()
            ->assertJson([
                'entry' => $employer->toArray()
            ]);
    });

    it('informs that no entry was found for given ID', function () {
        $invalidId = 9999999;
        $response = actingAs($this->recruiter)->getJson(url(BASE_URL, $invalidId));

        $response->assertNotFound();
    });

    it('rejects the request if user is not logged in', function () {
        $response = $this->getJson(url(BASE_URL));

        $this->assertGuest();
        $response->assertUnauthorized();
    });

    it('rejects the request if user is not a recruiter', function () {
        $response = actingAs(User::factory()->create())->getJson(url(BASE_URL));

        $this->assertAuthenticated();
        $response->assertForbidden();
    });

    it('rejects the request if a user tries to access employer entry of a different user', function () {
        $employer = Employer::factory()->create();
        $this->recruiter->employers()->save($employer);

        $response = actingAs(User::factory()->create())->getJson(url(BASE_URL, $employer->id));

        $this->assertAuthenticated();
        $response->assertForbidden();
    });
});
