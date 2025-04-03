<header class="bg-header-bg text-header-text flex items-stretch justify-between h-[88px]">
    <div class="flex items-stretch">
        <a class="flex items-center px-7" href="#"><img src="{{ Vite::asset('resources/images/logo.svg') }}" alt=""></a>

        <nav class="flex">
            <x-page-header-nav-item :active="true">Find Jobs</x-page-header-nav-item>
            <x-page-header-nav-item>Messages</x-page-header-nav-item>
            <x-page-header-nav-item>FAQ</x-page-header-nav-item>
        </nav>
    </div>

    <div class="flex space-x-10 items-stretch">
        <div class="flex items-center">
            <div class="border border-header-text/20 px-6 py-3">Location</div>
        </div>

        <nav class="flex items-center space-x-3 mr-5">
            <x-page-header-icon-nav href="#" src="https://placehold.co/38x38" text="User Login" />
        </nav>
    </div>
</header>
