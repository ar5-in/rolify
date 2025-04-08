<?php

use App\Http\Controllers\FAQController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\SavedJobsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [JobsController::class, 'index']);

Route::get('/faq', FAQController::class);

Route::middleware('auth')->group(function () {
    Route::get('/jobs/saved', [SavedJobsController::class, 'index']);
    Route::post('/jobs/saved', [SavedJobsController::class, 'store']);
    Route::delete('/jobs/saved', [SavedJobsController::class, 'destroy']);

    Route::get('/jobs/create', [JobsController::class, 'create']);
    Route::post('/jobs', [JobsController::class, 'store']);
    Route::get('/jobs/{job}/edit', [JobsController::class, 'edit']);
    Route::patch('/jobs/{job}', [JobsController::class, 'update']);
    Route::delete('/jobs/{job}', [JobsController::class, 'destroy']);
});

Route::get('/jobs/{job}', [JobsController::class, 'show']);

Route::get('/tags/{tag}', [\App\Http\Controllers\TagsController::class, 'show']);

Route::get('/register', [\App\Http\Controllers\RegistrationController::class, 'create']);
Route::post('/register', [\App\Http\Controllers\RegistrationController::class, 'store']);

Route::get('/login', [\App\Http\Controllers\AuthController::class, 'create'])->name('login');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'store']);
Route::delete('/logout', [\App\Http\Controllers\AuthController::class, 'destroy']);
