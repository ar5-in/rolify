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
