<?php

namespace App\Policies;

use App\Models\JobApplication;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobApplicationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobApplication $jobApplication): bool
    {
        // Either Creator of Job or Job Application can view
        return $user->is($jobApplication->user) || $user->is($jobApplication->job->employer->user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        $candidate = Role::where('title', 'Candidate')->first();
        return $user->role->is($candidate);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobApplication $jobApplication): bool
    {
        return $user->is($jobApplication->user) && $jobApplication->status === 'pending' || $user->is($jobApplication->job->employer->user);
    }

    public function updateStatus(User $user, JobApplication $jobApplication): bool
    {
        return $user->is($jobApplication->job->employer->user);
    }

    public function updateCoverLetter(User $user, JobApplication $jobApplication): bool
    {
        return $user->is($jobApplication->user) && $jobApplication->status === 'pending';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobApplication $jobApplication): bool
    {
        return $this->update($user, $jobApplication);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JobApplication $jobApplication): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JobApplication $jobApplication): bool
    {
        return false;
    }
}
