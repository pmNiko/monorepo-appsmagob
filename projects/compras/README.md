<h1 align="center">Compras</h1>

<p align="center" width="300">
   <img align="center" width="200" src="https://i.ibb.co/V3tMCZn/municipio.png" />
</p>
<br/><br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" title="License: MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg">
  </a>
  <a href="https://img.shields.io/npm" title="npm">
    <img src="https://img.shields.io/npm/v/react.svg?style=flat)">
  </a>
  <a href="https://www.npmjs.com/package/typescript)" title="npm version">
    <img src="https://badge.fury.io/js/typescript.svg">
  </a>
</p>

<p align="center">
  Compras de appsmagobar
</p>

<p align="center">    
  <img alt="Static Badge" src="https://img.shields.io/badge/%F0%9F%8F%B7%EF%B8%8F1.9.7-green?label=v2024-11-21&labelColor=darkgreen">
</p>

<p align="center">
  <a href="http://staging.smandes.gov.ar/gitea/AppSma/tabla-de-versionamiento/src/branch/main/README.md#arquitectura-general">Documentación</a>
</p>

---

#### Arquitectura general

<p align="center">
  <img src="http://staging.smandes.gov.ar/gitea/AppSma/tabla-de-versionamiento/media/branch/main/architecture.png" width="80%" />
</p>

- Para mantener sincronía entre los módulos del proyecto se debe mantener actualizada la estructura de directorios.
- El desarrollo particular debe ocurrir dentro del directorio **application**.
- Dentro de /application hay dos directorios:
  - /FN*SGD: \_Objeto de directivas para usequerysysgetdata*
  - /Router: _Se define el enrutador y paths_
  - /Sections: _Desarrollo de las secciones el módulo_

<br/>

###### Estrutura

<p align="center">
  <img src="./map.png" width="80%" />
</p>

---

#### Puesta en marcha

```sh
  $ pnpm run dev         #Iniciar en modo local
  $ pnpm run staging     #build en modo staging
  $ pnpm run production  #build en modo production
```

<br/>
<br/>

---

> > ---
> >
> > ### Directivas sysgetdata
>
> <br/>
>
> ---
>
> <br/>
>
> > **Licitaciones**
> > | key | Función | Parametros |
> > | ---- | ------- | --------- |
> > | Licitacion_Selector | fnappcmplicitacioncombo | |
> > | Licitacion_Get_By_ID | fnappcmpgetlicitacionporid | idlicitacion: number |
>
> >
>
> <br/>

<br/>

<br/>

#### Desarroladores

- [Esteban Menendez](https://github.com/ejmenendez)
- [Martín Nicolás Paneblanco](https://github.com/pmNiko)
