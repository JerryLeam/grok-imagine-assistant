### Video Generation Button

```html
<button data-slot="button"
    class="inline-flex justify-center whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 [&amp;_svg]:shrink-0 select-none bg-button-filled text-fg-invert hover:bg-button-filled-hover disabled:hover:bg-button-filled gap-1.5 px-3 rounded-full h-8 z-20 items-center pe-1 ps-3"
    type="button" aria-label="生成视频"><span class="font-semibold text-xs mb-[1px]">生成视频</span><span class="ms-0.5"><svg
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
            stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-play">
            <polygon points="6 3 20 12 6 21 6 3"></polygon>
        </svg></span>
</button>
```


### Formatted Snippet of moderation message
```html
<section aria-label="Notifications alt+T" tabindex="-1" aria-live="polite" aria-relevant="additions text"
    aria-atomic="false">
    <ol dir="ltr" tabindex="-1" class="toaster group" data-sonner-toaster="true" data-theme="dark" data-y-position="top"
        data-lifted="false" data-x-position="center"
        style="--front-toast-height: 48px; --offset: 32px; --width: 356px; --gap: 14px;">
        <li tabindex="0"
            class="group toast bg-popover rounded-2xl border-0 shadow-sm w-fit min-w-[200px] left-0 right-0 sm:mx-auto ring-1 ring-inset ring-input-border p-3.5 h-fit gap-3"
            data-sonner-toast="" data-styled="true" data-mounted="true" data-promise="false" data-swiped="false"
            data-removed="false" data-visible="true" data-y-position="top" data-x-position="center" data-index="0"
            data-front="true" data-swiping="false" data-dismissible="true" data-type="error" data-swipe-out="false"
            data-expanded="false"
            style="--index: 0; --toasts-before: 0; --z-index: 1; --offset: 0px; --initial-height: 48px;">
            <div class="flex items-center gap-3 font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-triangle-alert h-5 w-5 flex-shrink-0">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                </svg><span>Content Moderated. Try a different idea.</span></div>
        </li>
    </ol>
</section>
```

### Video Generation Component (at 61% progress)

```html
<button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed [&amp;_svg]:shrink-0 select-none bg-button-filled hover:bg-button-filled-hover disabled:hover:bg-button-filled px-3 rounded-full transition-all duration-400 h-8 group ps-1.5 pe-1 gap-0 ms-1 rounded-e-none -me-4 text-fg-invert"
        type="button" aria-label="视频预设" id="radix-_r_44_" aria-haspopup="menu" aria-expanded="false"
        data-state="closed">
    <div class="text-xs font-semibold w-[4ch] mb-[1px]">61%</div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-chevron-down size-4 group-data-[state=open]:rotate-180 transition-rotate duration-200">
        <path d="m6 9 6 6 6-6"></path>
    </svg>
    <div class="w-4"></div>
</button>
```


#### Video Player Component

```html
<div class="w-full">
    <div class="relative mx-auto rounded-2xl overflow-hidden" style="width: 617.25px; height: 823px;">
        <div class="grid"><img class="col-start-1 row-start-1 w-full h-full object-cover invisible pointer-events-none"
                               alt=""
                               src="https://assets.grok.com/users/4ad2a854-1562-4521-8059-c5a890c75f74/fb748bfc-3102-4a5c-91f6-52468defd7d5/content">
            <video
                    id="sd-video" playsinline="" autoplay="" loop=""
                    poster="https://assets.grok.com/users/4ad2a854-1562-4521-8059-c5a890c75f74/fb748bfc-3102-4a5c-91f6-52468defd7d5/content"
                    class="col-start-1 row-start-1 w-full h-full object-cover" style="visibility: visible;"
                    src="https://assets.grok.com/users/4ad2a854-1562-4521-8059-c5a890c75f74/generated/1a0e92fd-432e-4164-b04b-b18086496741/generated_video.mp4?cache=1"
                    preload="auto">你的浏览器不支持视频标签。
            </video>
            <video id="hd-video" playsinline="" autoplay="" loop=""
                   poster="https://assets.grok.com/users/4ad2a854-1562-4521-8059-c5a890c75f74/fb748bfc-3102-4a5c-91f6-52468defd7d5/content"
                   class="col-start-1 row-start-1 w-full h-full object-cover"
                   style="visibility: hidden;">你的浏览器不支持视频标签。
            </video>
        </div>
        <div class="absolute bottom-12 left-0 flex flex-col items-center w-full p-3 gap-3"></div>
        <div class="absolute bottom-0 left-0 flex flex-row justify-between items-center w-full p-3 gap-3">
            <div class="flex p-0 rounded-full bg-[#555]/75" aria-label="Text alignment">
                <button data-slot="button"
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 [&amp;_svg]:shrink-0 select-none border-border-l2 disabled:hover:bg-transparent rounded-full overflow-hidden h-10 w-10 p-2 text-white border-0 relative bg-white/15 hover:bg-white/15"
                        type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" class="lucide lucide-film size-[20px]">
                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        <path d="M7 3v18"></path>
                        <path d="M3 7.5h4"></path>
                        <path d="M3 12h18"></path>
                        <path d="M3 16.5h4"></path>
                        <path d="M17 3v18"></path>
                        <path d="M17 7.5h4"></path>
                        <path d="M17 16.5h4"></path>
                    </svg>
                    <span class="font-semibold sr-only text-primary">视频</span></button>
                <button data-slot="button"
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 [&amp;_svg]:shrink-0 select-none disabled:hover:bg-transparent border-transparent rounded-full overflow-hidden h-10 w-10 p-2 border-0 bg-transparent hover:bg-white/10 text-white/50 hover:text-white"
                        type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" class="lucide lucide-image size-[20px]">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                    <span class="font-semibold sr-only text-secondary">图片</span></button>
            </div>
            <div class="flex flex-col justify-center items-center w-full h-8 px-2">
                <div
                        class="w-full bg-[#555]/50 z-10 rounded-full overflow-hidden transition-all duration-300 cursor-pointer opacity-0 h-1">
                    <div class="w-full h-full bg-[#fff]/90" style="width: 18.5143%;"></div>
                </div>
            </div>
            <div class="transition-opacity duration-300 opacity-0">
                <button data-slot="button"
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 [&amp;_svg]:shrink-0 select-none border-border-l2 disabled:hover:bg-transparent rounded-full overflow-hidden h-10 w-10 p-2 text-white bg-[#555]/75 hover:bg-[#555]/100 border-0"
                        type="button" aria-label="暂停">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"
                         stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause size-[20px]">
                        <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                        <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                    </svg>
                </button>
            </div>
            <div>
                <button data-slot="button"
                        class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 [&amp;_svg]:shrink-0 select-none border-border-l2 disabled:hover:bg-transparent h-10 px-4 py-2 rounded-full text-white bg-[#555]/75 hover:bg-[#555]/100 border-0 gap-4"
                        type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round" class="lucide lucide-volume-off size-[20px]">
                        <path d="M16 9a5 5 0 0 1 .95 2.293"></path>
                        <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"></path>
                        <path d="m2 2 20 20"></path>
                        <path
                                d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11">
                        </path>
                        <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"></path>
                    </svg>
                    <span class="font-semibold text-md">取消静音</span></button>
            </div>
        </div>
    </div>
</div>
```

### Image Quota Exceeded Toast

```html
<section aria-label="Notifications alt+T" tabindex="-1" aria-live="polite" aria-relevant="additions text"
         aria-atomic="false">
    <ol dir="ltr" tabindex="-1" class="toaster group" data-sonner-toaster="true" data-theme="dark" data-y-position="top"
        data-lifted="false" data-x-position="center"
        style="--front-toast-height: 68px; --offset: 32px; --width: 356px; --gap: 14px;">
        <li tabindex="0"
            class="group toast bg-popover rounded-2xl border-0 shadow-sm w-fit min-w-[200px] left-0 right-0 sm:mx-auto ring-1 ring-inset ring-input-border p-3.5 h-fit gap-3"
            data-sonner-toast="" data-styled="true" data-mounted="true" data-promise="false" data-swiped="false"
            data-removed="false" data-visible="true" data-y-position="top" data-x-position="center" data-index="0"
            data-front="true" data-swiping="false" data-dismissible="true" data-type="error" data-swipe-out="false"
            data-expanded="false"
            style="--index: 0; --toasts-before: 0; --z-index: 1; --offset: 0px; --initial-height: 68px;">
            <div class="flex items-center gap-3 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-triangle-alert h-5 w-5 flex-shrink-0">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                </svg>
                <span>Image limit reached<br><span
                        class="text-secondary font-medium">Upgrade to unlock more</span></span>
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 [&amp;_svg]:shrink-0 select-none bg-button-primary text-background hover:bg-button-primary-hover h-10 rounded-xl px-3.5 py-1.5 text-sm font-medium ms-4"
                        type="button">升级
                </button>
            </div>
        </li>
    </ol>
</section>
```

### More option button that opens the popup menu
```html
<button data-slot="button"
        class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 [&amp;_svg]:shrink-0 select-none text-fg-secondary hover:bg-button-ghost-hover hover:text-fg-primary disabled:hover:bg-transparent border border-transparent h-8 gap-1.5 rounded-full overflow-hidden w-8 px-1.5 py-1.5"
        type="button" aria-label="更多选项" id="radix-_r_g3_" aria-haspopup="menu" aria-expanded="false"
        data-state="closed">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis size-4">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
    </svg>
</button>
```

### Popup menu

```html
<div data-side="top" data-align="start" role="menu" aria-orientation="vertical" data-state="open"
     data-radix-menu-content="" dir="ltr" id="radix-_r_g4_" aria-labelledby="radix-_r_g3_"
     class="overflow-auto max-h-[--radix-dropdown-menu-content-available-height] rounded-2xl bg-popover border border-border-l1 text-primary p-1 shadow-md shadow-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-dropdown-menu-content-transform-origin)]"
     tabindex="-1" data-orientation="vertical"
     style="outline: none; --radix-dropdown-menu-content-transform-origin: var(--radix-popper-transform-origin); --radix-dropdown-menu-content-available-width: var(--radix-popper-available-width); --radix-dropdown-menu-content-available-height: var(--radix-popper-available-height); --radix-dropdown-menu-trigger-width: var(--radix-popper-anchor-width); --radix-dropdown-menu-trigger-height: var(--radix-popper-anchor-height); pointer-events: auto;">
    <div role="menuitem"
         class="relative flex select-none items-center cursor-pointer px-3 py-2 rounded-xl text-sm outline-none focus:bg-button-ghost-hover aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
         tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-thumbs-up size-4">
                <path d="M7 10v12"></path>
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
            缩略图
        </div>
    </div>
    <div role="menuitem"
         class="relative flex select-none items-center cursor-pointer px-3 py-2 rounded-xl text-sm outline-none focus:bg-button-ghost-hover aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
         tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-thumbs-down size-4">
                <path d="M17 14V2"></path>
                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"></path>
            </svg>
            向下缩略图
        </div>
    </div>
    <div role="menuitem"
         class="relative flex select-none items-center cursor-pointer px-3 py-2 rounded-xl text-sm outline-none focus:bg-button-ghost-hover aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
         tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-expand size-4">
                <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
                <path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path>
                <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path>
                <path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path>
            </svg>
            升级视频
        </div>
    </div>
</div>
```