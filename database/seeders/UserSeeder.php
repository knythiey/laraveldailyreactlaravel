<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::factory()->create([
            'email' => 'test@last.com'
        ]);
        $admin->roles()->attach(1);
        
        $editor = User::factory()->create();
        $editor->roles()->attach(2);
    }
}
