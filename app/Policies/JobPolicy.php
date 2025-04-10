<?php

namespace App\Policies;

use App\Models\Job;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Job $job): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        $recruiter = Role::where('title', 'Recruiter')->first();
        return $user->role->id === $recruiter->id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Job $job): bool
    {
        return $job->employer->user->id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Job $job): bool
    {
        return $job->employer->user->id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Job $job): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Job $job): bool
    {
        return false;
    }
}
