Random Benchmark
================

This is not a random benchmark! ... or is it?
The suite was developed to track the performance progress of `xorshift`, which
[@AndreasMadsen](https://github.com/AndreasMadsen) and I co-developed during a
Node.js hackathon in Copenhagen.

Suite
-----

The benchmark includes the following npm packages:

* `Math.random()`
* [`mersenne`](https://www.npmjs.org/package/mersenne)
* [`mt19937`](https://www.npmjs.org/package/mt19937) *(Native)*
* [`uupaa.random.js`](https://www.npmjs.org/package/uupaa.random.js)
* [`xorshift`](https://www.npmjs.org/package/xorshift)

**Methodology**: To keep comparisons consistent, all packages are benchmarked on
their ability to generate doubles in the range [0, 1). If this is not provided
with the package, normalisation is done in the appropiate wrapper.

Each package is sampled 100 times, by running 1e6 iterations and then normalising
the mean and standard deviation with the number of iterations, to get a measure
for the performance of a single operation, even though this may be misleading
because all the operations of a single package are batched.

Installation
------------

```bash
npm install random-benchmark
```

Usage
-----

```bash
random-benchmark
```

License
-------
[ISC © 2014, Emil Bay <github@tixz.dk>](LICENSE)
