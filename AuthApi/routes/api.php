<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\AuthController;
use App\Models\User;

// Endpoint para registrar un usuario
Route::post('register', [AuthController::class, 'register']);
// Endpoint para iniciar sesión
Route::post('login', [AuthController::class, 'login']);

// endpoints para autenticación con Google
Route::get('/google-auth/redirect', function () {
    return Socialite::driver('google')->stateless()->redirect();
});

// Endpoint para manejar el callback de Google después de la autenticación
Route::get('/google-auth/callback', function () {
    $googleUser = Socialite::driver('google')->stateless()->user();

    // Buscamos o creamos un usuario en la base de datos basado en el correo electrónico de Google
    $user = User::updateOrCreate(
        ['email' => $googleUser->getEmail()],
        [
            'name' => $googleUser->getName(),
            'google_id' => $googleUser->getId(),
            'email_verified_at' => now()
        ]
    );

    // Generamos el token
    $token = $user->createToken('auth_token')->plainTextToken;

    return redirect("http://localhost:62994/dashboard.html?token=" . $token . "&name=" . urlencode($user->name));
});

// Endpoints mandar correo para resetear contraseña
Route::post('reset-password-link', [AuthController::class, 'resetPasswordLink']);
// Endpoint obtener el token y poder reestablecer la contraseña
Route::get('reset-password/{token}', function ($token, Request $request) {

    $frontendUrl = "http://localhost:62994/reestablecer.html";

    $urlFinal = $frontendUrl . "?token=" . $token . "&email=" . urlencode($request->email);

    return redirect($urlFinal);
})->name('password.reset');
// Endpoint para reestablecer la contraseña con el token recibido
Route::post('reset-password', [AuthController::class, 'resetPassword']);

// Rutas protegidas por autenticación
Route::middleware('auth:sanctum')->group(function () {
    // Endpoint para cerrar sesión
    Route::post('logout', [AuthController::class, 'logout']);
    // Endpoint para editar el perfil del usuario
    Route::post('profile', [AuthController::class, 'profile']);
    // Endpoint para verificar la validez del token y obtener información del usuario
    Route::get('verify-token', function (Request $request) {
        return response()->json([
            'isValid' => true,
            'user' => $request->user()
        ], 200);
    });
});
