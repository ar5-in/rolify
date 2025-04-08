<header class="bg-header-bg text-header-text flex items-stretch justify-between h-[88px]">
    <div class="flex items-stretch">
        <a class="flex items-center px-7" href="/"><img src="{{ Vite::asset('resources/images/logo.svg') }}" alt=""></a>

        <nav class="flex">
            <x-page-header-nav-item href="/" :active="request()->is('/')">Find Jobs</x-page-header-nav-item>
            <x-page-header-nav-item href="/jobs/saved" :active="request()->is('jobs/saved')">Saved Jobs</x-page-header-nav-item>
            <x-page-header-nav-item href="/faq" :active="request()->is('faq')">FAQ</x-page-header-nav-item>
        </nav>
    </div>

    <div class="flex space-x-10 items-stretch">
        <div class="flex items-center space-x-4">
            <a class="block px-6 py-2 bg-header-text text-header-bg rounded-full" href="/jobs/create">Create Job</a>
            <div class="border border-header-text/20 px-6 py-3">Location</div>
        </div>

        <nav class="flex items-stretch space-x-3 mr-5">
            <div class="relative flex items-center group/dropdown">
                <x-page-header-icon-nav href="#" src="https://placehold.co/38x38" text="User Login" />
                <div class="absolute top-full right-0 p-1 flex-col gap-1 bg-header-bg text-header-text hidden group-hover/dropdown:flex">
                    <a class="block hover:bg-white/10 px-4 py-2 transition-colors duration-300" href="/login">Login</a>
                    <a class="block hover:bg-white/10 px-4 py-2 transition-colors duration-300" href="/register">Register</a>
                </div>
            </div>
        </nav>
    </div>
</header>
