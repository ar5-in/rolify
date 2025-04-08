@php
    $selectRoleOptions = ['' => 'Choose One'];
    foreach($roles as $role)
    {
        $selectRoleOptions[$role->id] = $role->title;
    }
@endphp
<x-layout>
    <article>
        <x-section-heading>Register</x-section-heading>
        <x-section>
            <x-form action="/register" method="post" width="narrow">
                <x-form.field id="name">
                    <x-form.input id="name" name="name" type="text" placeholder="Name" />
                </x-form.field>

                <x-form.field id="email">
                    <x-form.input id="email" name="email" type="email" placeholder="Email Address" />
                </x-form.field>

                <x-form.field id="role_id" label="What is your role?">
                    <x-form.input id="role_id" name="role_id" type="selection" :options="$selectRoleOptions" />
                </x-form.field>

                <x-form.field id="password">
                    <x-form.input id="password" name="password" type="password" placeholder="Password" />
                </x-form.field>

                <x-form.field id="password_confirmation">
                    <x-form.input id="password_confirmation" name="password_confirmation" type="password" placeholder="Confirm Password" />
                </x-form.field>

                <x-form.controls>
                    <x-form.button label="Register" />
                    <x-form.button label="Login" href="/login" />
                </x-form.controls>
            </x-form>
        </x-section>
    </article>
</x-layout>
