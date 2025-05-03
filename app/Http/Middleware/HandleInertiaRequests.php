<?php

namespace App\Http\Middleware;

use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = null;
        if($request->user())
        {
            $user = $request->user()->only('id', 'email', 'name');
            $user['can'] = [
                'createJobs' => $request->user()->can('create', Job::class),
                'createJobApplication' => $request->user()->can('create', JobApplication::class),
            ];
            $user['savedJobs'] = $request->user()->savedJobs->map(function (Job $job) {
                return $job->id;
            })->all();
        }

        return [
            ...parent::share($request),
            'auth.user' => fn () => $user
        ];
    }
}
