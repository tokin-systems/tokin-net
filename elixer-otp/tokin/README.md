# TOKIN

**TODO: Add description**

`iex -S mix`

## Functional Palette

* Streams
  * chunk_while(enum, acc, chunk_fun, after_fun)
    Chunks the enum with fine grained control when every chunk is emitted
  * cycle(enumerable)
    Creates a stream that cycles through the given enumerable, infinitely
  * [dedup_by(enum, fun)](https://hexdocs.pm/elixir/Stream.html#dedup_by/2)
    Creates a stream that only emits elements if the result of calling fun on the element is different from the (stored) result of calling fun on the last emitted element
  * filter(enum, fun)
    Creates a stream that filters elements according to the given function on enumeration
  * flat_map(enum, mapper)
    Maps the given fun over enumerable and flattens the result
  * intersperse(enumerable, intersperse_element)
    Lazily intersperses intersperse_element between each element of the enumeration
  * into(enum, collectable, transform \\ fn x -> x end)
    Injects the stream values into the given collectable as a side-effect
  * resource(start_fun, next_fun, after_fun)
    Emits a sequence of values for the given resource
  * scan(enum, acc, fun)
    Creates a stream that applies the given function to each element, emits the result and uses the same result as the accumulator for the next computation. Uses the given acc as the starting value
  * uniq_by(enum, fun)
    Creates a stream that only emits elements if they are unique, by removing the elements for which function fun returned duplicate items
  * zip(left, right)
    Zips two collections together, lazily
* System
  * cmd(command, args, opts \\ [])
    Executes the given command with args
  * get_pid()
    Erlang VM process identifier
  * time_offset()
    Returns the current time offset between the Erlang VM monotonic time and the Erlang VM system time
* Kernel.ParallelCompiler
  * compile(files, options \\ []) View Source
    Compiles the given files.
* Protocol
  * derive(protocol, module, options \\ []) View Source(macro)
    Derives the protocol for module with the given options.

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `tokin` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:tokin, "~> 0.1.0"}
  ]
end
```

Documentation can be generated with [ExDoc](https://github.com/elixir-lang/ex_doc)
and published on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at [https://hexdocs.pm/tokin](https://hexdocs.pm/tokin).

## Research Sources

* https://github.com/sheharyarn/dbfs
* https://sheharyar.me/blog/writing-blockchain-elixir/
* http://howistart.org/posts/elixir/1/
* https://hexdocs.pm/elixir/Stream.html
* https://medium.com/@heart.beacon.cycle/the-blockchain-is-obsolete-e56e3e83fc0f
* https://blockchain.works-hub.com/learn/Erlang-Digraph
* https://github.com/f34nk/dgraph_ex
* https://github.com/bitwalker/swarm
* https://arxiv.org/pdf/1801.09515.pdf
* https://hexdocs.pm/absinthe
* https://hexdocs.pm/matrex/
* https://github.com/leveldb-erlang/h2leveldb
* https://hackernoon.com/demystifying-hashgraph-benefits-and-challenges-d605e5c0cee5
* https://medium.com/ibbc-io/hashgraph-for-dummies-90ddde3be9e2
* https://docs.xyo.network/XYO-White-Paper.pdf?gclid=Cj0KCQjw9LPYBRDSARIsAHL7J5kJBiyp0ytkisYkovJ9Jqb8o4_nGOnSDW8jrNgWZa3-xhM3kwlTo58aAoOJEALw_wcB
* https://arxiv.org/pdf/1802.10185.pdf
* https://github.com/kblake/neural_network_elixir/blob/master/lib/neural_network.ex
* https://wiki.linuxfoundation.org/networking/dccp
*

# Liar’s Poker

The basic concept is each player gets a dollar bill out of their pocket and looks at the serial number. One player makes a claim of a poker hand based on the serial number and the next player either has to make a claim of having a better hand or accuse the first player of lying.

When a player is accused of lying they lose if they lied and win if they were telling the truth. The winner gets both bills.

You can play for any size bill. To keep the game fair each player should put up the same amount of money and then the players exchange all of the money for different bills at the bank. Then the players split the money and play with the new bills.

You can start with a low claim so you can make a higher claim later or you can start with a high claim in hopes your opponent calls you a lair or makes an untrue higher claim. The game seems simple but you’ll quickly learn that you need to use strategy to have the best chance to win.
