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

## Newton's Basic Equation

This equation describes the motion, displacement, and acceleration of a body due to some force (or set of forces)

$$ F = ma = m\frac{\partial v}{\partial t} = m\frac{\partial x^2}{\partial^2 t} $$

Where

- $F$ is force, in units N = kg m s$^{-2}$
- $m$ is mass, in units kg
- $a$ is acceleration, in units m $s^{-2}$
- $v$ is velocity, in units m s$^{-1}$
- $x$ is displacement, in units m
- $t$ is time, in units s

This equation can be used in all sorts of physical systems with various zeroeth, first, second-order, and higher-order forces driving the motion of a body

## Fourier Sine and Cosine Series Representations of Functions

Any function on the interval $0 \leq x \leq \lambda$ can be written as a sum of sines and/or cosines (same thing really, just $\pi/2$ out of phase) using the following formulation:

**Sine**

$$f(x) = \sum_{n=1}^{\infty}a_n\sin\left(\frac{n\pi x}{\ell}\right)$$

Where

$$a_n = \frac{2}{\ell}\int_0^\ell f(x)\sin\left(\frac{n\pi x}{\ell}\right)dx$$

**Cosine**

$$f(x) = \sum_{n=0}^{\infty}b_n\cos\left(\frac{n\pi x}{\ell}\right)$$

Where

$$b_0 = \frac{1}{\ell}\int_0^\ell f(x)dx$$

and

$$b_n = \frac{2}{\ell}\int_0^\ell f(x)\cos\left(\frac{n\pi x}{\ell}\right)dx\;\;(n \geq 1)$$

**Fourier Series**

$$f(x) = b_0 + \sum_{n=1}^\infty\left(\underbrace{a_n\sin(n\pi x)}_{\text{odd function}}+\underbrace{b_n\cos(n\pi x)}_{\text{even function}}\right)$$

## Fourier Transform and Inverse Fourier Transform

Let $f$ be the function dependent on space or time (denoted by $x$) and let $\hat f$ be the transformed function dependent on frequency (traditionally denoted by $\zeta$). Then

$$\hat f(\zeta) = \int_{-\infty}^\infty f(x)e^{-2\pi i x\zeta}dx\;\; \forall \zeta \in \mathbb{R}$$

and, inversely,

$$f(x) = \int_{-\infty}^\infty \hat f(\zeta)e^{2\pi i x\zeta}d\zeta\;\; \forall x \in \mathbb{R}$$

The Fourier transform changes a space-or-time dependent function into a frequency-dependent function. For example, if you plug an audio recording (time dependent) into a fourier transform, you would get a set of frequencies and their relative strengths in the signal back. The frequency function you get back can be inversely transformed into the original function; or, if you remove unwanted frequencies, you can inversely transform into an audio recording minus the unwanted high-pitched buzz.

Fourier transforms enable modern commincation and many forms of audio and visual data processing. Truly an amazing mathematical tool!
