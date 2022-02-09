---
title: 🤏 Calculating Error and Parameter Estimation
layout: standalone
exclude: true
---

This page consolidates notes from CEE308 Environmental Engineering Lab at Princeton University, Spring 2022, taught by Professor Peter Jaffe.

## Mean, variance, and standard deviation from $n$ direct measurements

The mean $\bar x$ is calculated as:

$$
\bar x = \sum_i \frac{x_i}{n}
$$

Where $\bar x$ is the mean, $x_i$ is the $i$-th measurement, and $n$ is the number of measurements.

If the true standard error $\sigma$ or variance $\sigma^2$ for the population is known, and if the mean $\bar x$ was estimated from $n$ samples, then variance $V$ can be calculated as

$$
\sigma_{\bar x}^2 = \frac{\sigma^2}{n}
$$

Or if the variance $S^2$ is to be estimated, then

$$
S^2 = \frac{1}{n-1}\sigma_i \left(x_i-\bar x\right)^2
$$

Where in all these equations:

- $\sigma$ refers to the *true* error
- $S$ refers to the *estimated* error

## Least-squares Linear Regression

Suppose you want to fit the function

$$
y = a + bx
$$

to a set of 2D data of $n$ samples. Then parameters $a$ and $b$ can be estimated using the following equations:

$$
a = \frac{\sum_i x_i^2\sum_i y_i - \sum_i x_i \sum_i y_i}{n\sum_i x_i^2 - \left(\sum_i x_i\right)^2}
$$

$$
b = \frac{n\sum_i x_i y_i - \sum_i x_i \sum y_i}{n\sum_i x_i^2 - \left(\sum_i x_i\right)^2}
$$

Where, for clarity, $a$ is the intercept and $b$ is the slope of the regression.

### Parameter error estimation

The set of residuals $\Epsilon$ can be defined as

$$
\Epsilon = \{\epsilon_i : \epsilon_i = y_i - \left(a + bx_i\right), \forall (x_i, y_i)\}
$$

Then the variance of the regression model can be calculated as follows:

$$
S_{y/x}^2 = \frac{1}{n-2} \sum_i \epsilon_i^2,\;\forall \epsilon_i\in\Epsilon
$$

And the variance of the slope $b$:

$$
S^2_b = \frac{S_{x/y}^2}{\sum_i\left(x_i-\bar x\right)^2}
$$

And the variance of the intercept $a$:

$$
S^2_a = S_{x/y}^2\left(\frac{1}{n} + \frac{\bar x^2}{\sum_i\left(x_i - \bar x\right)^2}\right)
$$

Note that the error $S$ (usually denoted $\sigma$, even when estimated) of either parameter is simply the square root of the respective variance.

Therefore when writing a technical paper where you produce "error bars" or $\pm$ standard deviation, calculate $\sigma = \sqrt{S^2}$ for each determined parameter.

## Error propagation

Given the analytical model

$$
y = f\left(x_1, x_2, ..., x_3\right)
$$

Then the variance of the model is

$$
\sigma^2_y = \sum_i \frac{\sigma^2_{\bar x, i}}{x_i}\left(\frac{\partial y}{\partial x_i}\right)^2
$$