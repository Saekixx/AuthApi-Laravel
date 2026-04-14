<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name"     => "required|string|max:255",
            "email"    => "required|email|unique:users",
            "password" => "required|min:8|same:confirmed_password",
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        $user = User::create([
            "name"     => $request->name,
            "email"    => $request->email,
            "password" => Hash::make($request->password)
        ]);

        $response = [
            'name'  => $user->name,
            'email' => $user->email,
            'token' => $user->createToken("App")->plainTextToken
        ];

        return response()->json($response, 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(["errors" => ["Credenciales inválidas"]], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $response = [
            'name'  => $user->name,
            'email' => $user->email,
            'token' => $user->createToken("App")->plainTextToken
        ];

        return response()->json($response);
    }

    public function profile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            "name"  => "required|string|max:255",
            "email" => "required|email|unique:users",
            "password" => "nullable|min:8|confirmed"
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'name'  => $user->name,
            'email' => $user->email,
            'message' => 'Perfil actualizado con éxito'
        ]);
    }
}
