<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = Role::create(['name' => 'Administrator']);
        $admin->permissions()->attach(Permission::pluck('id'));
        
        $editor = Role::create(['name' => 'Editor']);
        $editor->permissions()->attach(Permission::where('name', '!=', 'post_delete')->pluck('id'));
    }
}
