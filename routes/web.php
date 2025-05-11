<?php

use App\Http\Controllers\CreatedJobsController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\SavedJobsController;
use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Support\Facades\Route;

Route::get('/', [JobsController::class, 'index']);

Route::middleware('guest')->group(function () {
    Route::get('/register', [\App\Http\Controllers\RegistrationController::class, 'create']);
    Route::post('/register', [\App\Http\Controllers\RegistrationController::class, 'store']);

    Route::get('/login', [\App\Http\Controllers\AuthController::class, 'create'])->name('login');
    Route::post('/login', [\App\Http\Controllers\AuthController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('/jobs/saved', [SavedJobsController::class, 'index']);
    Route::post('/jobs/saved/sync', [SavedJobsController::class, 'sync']);
    Route::post('/jobs/saved', [SavedJobsController::class, 'store']);
    Route::delete('/jobs/saved', [SavedJobsController::class, 'destroy']);

    Route::get('/jobs/create', [JobsController::class, 'create'])->can('create', Job::class);
    Route::get('/jobs/created', CreatedJobsController::class)->can('create', Job::class);
    Route::post('/jobs', [JobsController::class, 'store']);
    Route::get('/jobs/{jobWithDetails}/edit', [JobsController::class, 'edit'])->can('update', 'jobWithDetails');
    Route::patch('/jobs/{job}', [JobsController::class, 'update'])->can('update', 'job');
    Route::delete('/jobs/{job}', [JobsController::class, 'destroy'])->can('delete', 'job');

    Route::get('/jobs/{job}/apply', [JobApplicationController::class, 'create'])->can('create', JobApplication::class);
    Route::post('/applications', [JobApplicationController::class, 'store'])->can('create', JobApplication::class);

    Route::get('/applications/{jobApplication}/edit', [JobApplicationController::class, 'create'])->can('update', 'jobApplication');
    Route::patch('/applications/{jobApplication}', [JobApplicationController::class, 'update'])->can('update', 'jobApplication');
    Route::delete('/applications/{jobApplication}', [JobApplicationController::class, 'destroy'])->can('delete', 'jobApplication');
    Route::get('/applications', [JobApplicationController::class, 'index']);

    Route::delete('/logout', [\App\Http\Controllers\AuthController::class, 'destroy']);
});

Route::get('/jobs/{jobWithDetails}', [JobsController::class, 'show']);

Route::get('/tags/{tag}', [\App\Http\Controllers\TagsController::class, 'show']);

Route::get('/faq', FAQController::class);

Route::get('/test', function () {
    return inertia('Test');
});
