<?php

namespace App\Providers;

use App\Models\Job;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // TODO Research more on using this method
        Model::unguard();

        /* Only serve via HTTPS on production */
        if($this->app->environment('production'))
        {
            \URL::forceScheme('https');
        }

        \Route::bind('jobWithDetails', function (string $value) {
            return Job::with('tags', 'employer')->findOrFail($value);
        });
    }
}
