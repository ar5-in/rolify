<?php

use App\Http\Controllers\CreatedJobsController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\SavedJobsController;
use App\Models\Job;
use Illuminate\Support\Facades\Route;

Route::get('/', [JobsController::class, 'index']);

Route::get('/faq', FAQController::class);

Route::middleware('auth')->group(function () {
    Route::get('/jobs/saved', [SavedJobsController::class, 'index']);
    Route::post('/jobs/saved', [SavedJobsController::class, 'store']);
    Route::delete('/jobs/saved', [SavedJobsController::class, 'destroy']);

    Route::get('/jobs/create', [JobsController::class, 'create'])->can('create', Job::class);
    Route::get('/jobs/created', CreatedJobsController::class)->can('create', Job::class);
    Route::post('/jobs', [JobsController::class, 'store']);
    Route::get('/jobs/{job}/edit', [JobsController::class, 'edit'])->can('update');
    Route::patch('/jobs/{job}', [JobsController::class, 'update'])->can('update');
    Route::delete('/jobs/{job}', [JobsController::class, 'destroy'])->can('delete');
});

Route::get('/jobs/{job}', [JobsController::class, 'show']);

Route::get('/tags/{tag}', [\App\Http\Controllers\TagsController::class, 'show']);

Route::get('/register', [\App\Http\Controllers\RegistrationController::class, 'create']);
Route::post('/register', [\App\Http\Controllers\RegistrationController::class, 'store']);

Route::get('/login', [\App\Http\Controllers\AuthController::class, 'create'])->name('login');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'store']);
Route::delete('/logout', [\App\Http\Controllers\AuthController::class, 'destroy']);
