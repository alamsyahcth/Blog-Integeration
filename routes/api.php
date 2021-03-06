<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/post','PostController@index');
Route::post('/post/store','PostController@store');
Route::get('/post/{id}','PostController@show');
Route::post('/post/update/{id}','PostController@update');
Route::post('/post/delete/{id}','PostController@destroy');
