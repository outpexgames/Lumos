function getNthPrime(n) {
    l: for (var primes = [2], i = 3, root; primes.length < n; i += 2) {
        for (root = Math.sqrt(i), j = 0; primes[j] <= root; j++) {
            if (i % primes[j] === 0) continue l;
        }
        primes.push(i);
    }
    return primes[n - 1];
}

exports.run = function (client, message, args, args2, cmd, config) {
    message.channel.send(getNthPrime(args.join(' ')))
}