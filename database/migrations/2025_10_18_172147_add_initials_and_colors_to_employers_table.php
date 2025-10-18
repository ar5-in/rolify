<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employers', function (Blueprint $table) {
            $table->string('logo_url')->nullable()->change();
            $table->string('initials')->default('')->after('name');
            $table->string('foreground')->default('#ffffff')->after('name');
            $table->string('background')->default('#000000')->after('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employers', function (Blueprint $table) {
            $table->dropColumn('initials');
            $table->dropColumn('foreground');
            $table->dropColumn('background');
        });
    }
};
