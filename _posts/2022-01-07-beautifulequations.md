---
title: ∮ Beautiful Equations
layout: post
---

## The Navier-Stokes Equation

Tha Navier-Stokes equation describes the motion of a parcel of fluid on Earth, either in the atmosphere or in liquid form (e.g. rivers, oceans).

Equation from Dr. Elie Bou-Zeid's Environmental Fluid Mechanics class, Fall 2021.

$$ \frac{D\vec u}{Dt} = \frac{\partial \vec u}{\partial t} + \vec u \cdot \nabla \vec u = -\frac{1}{\rho}\nabla p + \nu \nabla^2\vec u + \vec g\left(1+\frac{\rho'}{\rho}\right) - f_c \vec k \times \vec u$$

Where 

- $ \frac{D\vec u}{Dt} $ is the material derivative of velocity with respect to time
- $\rho$ is density
- $p$ is pressure
- $\nu$ is viscosity
- $g$ is gravity
- $\rho'$ is the difference between parcel density $\rho$ and mean density $\bar \rho$: ($\rho' = \rho - \bar \rho$)
- $f_c$ is coriolis force: $f_c = 2\Omega \sin(\text{latitude})$
- $k$ is unit vector in vertical direction

## The Bernoulli Equation

The Bernoulli equation derives from the Navier-Stokes equation and assumptions of (1) steady-state ($\frac{\partial \vec u}{\partial t} = 0$), (2) no viscous forces ($\nu=0$), (3) no bouyant force ($\rho = \bar\rho \Rightarrow \rho' = 0$), and (4) no coriolois $f_c = 0$.

$$\frac{U_2^2}{2} + \frac{p_2}{\rho} + gz_2 = \frac{U_1^2}{2} + \frac{p_1}{\rho} + gz_1$$

Where

- $U_i$ is total flow speed at point $i$ (no flow normal to streamline)
- $p$ is pressure at point $i$
- $\rho$ is density
- $g$ is acceleration due to gravity
- $z_i$ is height at point $i$ relative to some baseline for all $i$

The Bernoulli equation is very useful for determining speed of flow due to pressure or elevation changes in pipes, rivers, etc.

## Euler's Formula

$$e^{i\pi} = \cos x + i \sin x$$

## Euler's Identity

A special case of Euler's formula evaluated at $x = \pi$

$$e^{i\pi}+1 = 0$$

