<x-layout>
    <article>
        <x-section-heading>Login</x-section-heading>
        <x-section>
            <x-form action="/login" method="post" width="narrow">
                <x-form.field id="email">
                    <x-form.input id="email" name="email" type="email" value="{{ old('email') }}" placeholder="Email Address" required />
                </x-form.field>

                <x-form.field id="password">
                    <x-form.input id="password" name="password" type="password" placeholder="Password" required />
                </x-form.field>

                <x-form.controls>
                    <x-form.button label="Login" />
                    <x-form.button label="Register" href="/register" />
                </x-form.controls>
            </x-form>
        </x-section>
    </article>
</x-layout>
