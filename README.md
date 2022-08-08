<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Here is how I installed Laravel 9 with React 18 on Breeze
```
laravel new project-name
```
## Enable Vite
To enable Vite so it would work with our main resources/js/app.js and resources/css/app.css files, in the resources/views/welcome.blade.php we add this Blade directive before </head>:
```
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])
</head>
```
## Install npm dependencies
```
npm install
```
## Install react, react-dom, and for React to work with Vite, we need to install a specific plugin:
```
npm install react@18 react-dom@18
npm i @vitejs/plugin-react@1.3.2
```

## Edit vite.config.js
file should look like this
```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',            
            'resources/js/app.jsx',
        ]),
        react(),
    ],
});
```
```
npm install and npm run dev
```
## Install Breeze
```
composer require laravel/breeze --dev
php artisan breeze:install
npm install
npm run dev
```

# Check vite.config.js
file should look like this
```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',            
            'resources/js/app.jsx',
        ]),
        react(),
    ],
});
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).






