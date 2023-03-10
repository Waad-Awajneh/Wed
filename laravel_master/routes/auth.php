<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::post('register', [AuthController::class, 'register'])
    ->name('register');


Route::post('googleRegister', [AuthController::class, 'googleRegister'])
    ->name('googleRegister');



Route::post('login', [AuthController::class, 'login'])
    ->name('login');

Route::post('googleLogin', [AuthController::class, 'googleLogin'])
    ->name('googleLogin');
