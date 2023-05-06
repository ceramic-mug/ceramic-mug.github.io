---
title: 🧮 Standard error and confidence interval calculations
layout: post
tags: research
---

I've always found it difficult to remember exactly how to calculate standard error and produce confidence intervals for a measure. This post is a quick reference for me and for others who are trying to produce confidence intervals for data metrics.

The following is an adaptation of Ch. 7.2 from Devore's *Probability & Statistics for Engineering and the Sciences, 8th edition* [(link)](https://faculty.ksu.edu.sa/sites/default/files/probability_and_statistics_for_engineering_and_the_sciences.pdf)

## Confidence interval for population proportion

Let $p$ denote the proportion of the population with a given trait. Then $1-p$ is the proportion without the given trait. Suppose a random sample of size $n$ is obtained with $X$ being the number of objects/individuals with the desired trait in the sample.

The estimator of $p$ for the population is $\widehat p = \frac{X}{n}$, which is the sample fraction of successes. Then

$$
\sigma_{\widehat p} = \sqrt{\frac{p(1-p)}{n}}
$$

When the unkown $p$ is normalized using $\widehat p$, the confidence interval can be written

$$
P\left( -z_{\alpha/2} < \frac{\widehat p - p}{\sqrt{p(1-p)/n}} \right) \approx 1 - \alpha
$$

This can be solved to arrive at the final form

$$
p = \frac{\widehat{p} + z^2_{\alpha/2}/(2n)}{1 + z^2_{\alpha/2}/n} \pm z_{\alpha/2}\frac{\sqrt{\widehat p(1 - \widehat p)/n + z^2_{\alpha/2}/(4n^2)}}{1 + z^2_{\alpha/2}/n}
$$

Where $z_{\alpha/2}$ is the critical value drawn from a two-tailed normal distribution:

- 95% CI: $z_{\alpha/2} = 1.96$
- 99% CI: $z_{\alpha/2} = 2.58$