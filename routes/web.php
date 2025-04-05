<?php

use App\Http\Controllers\JobsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [JobsController::class, 'index']);

Route::get('/jobs/create', [JobsController::class, 'create']);
Route::get('/jobs/saved', [JobsController::class, 'saved']);
Route::post('/jobs', [JobsController::class, 'store']);
Route::get('/jobs/{job}', [JobsController::class, 'show']);

Route::get('/tags/{tag}', [\App\Http\Controllers\TagsController::class, 'show']);

Route::get('/register', [\App\Http\Controllers\RegistrationController::class, 'create']);
Route::post('/register', [\App\Http\Controllers\RegistrationController::class, 'store']);

Route::get('/login', [\App\Http\Controllers\AuthController::class, 'create']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'store']);
Route::delete('/logout', [\App\Http\Controllers\AuthController::class, 'destroy']);
