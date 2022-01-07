---
title: ∮ Beautiful Equations
layout: post
---

## The Navier-Stokes Equation

$$ \frac{D\vec u}{Dt} = \frac{\partial \vec u}{\partial t} + \vec u \cdot \nabla \vec u = -\frac{1}{\rho}\nabla p + \nu \nabla^2\vec u + \vec g\left(1+\frac{\rho'}{\rho}\right) - f_c \vec k \times \vec u$$

Where

- $ \frac{D\vec u}{Dt} $ is the material derivative of velocity with respect to time
- $\rho$ is density
- $p$ is pressure
- $\nu$ is viscosity
- $g$ is gravity
- $\rho'$ is the difference between parcel density $\rho$ and mean density $\bar \rho$: ($\rho' = \rho - \bar \rho$)
- $f_c$ is coriolis force: $2\Omega \sin(\text{latitude})$
- $k$ is unit vector in vertical direction