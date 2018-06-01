# TOKIN-NET

## Components

* Mind - Keeper of algos and protocols. Supervises network health.
* Memory - Distributed systems
  * Blockchain - transactions and events
  * GraphDB - relationships
  * p2p - content and data blobs
  * K/V - game and application state
* Output - validates and verifies results, sends to client and memory
* Client - requests data and adds transactions

## Process Flows

1.  Client wants a response to something
    1.  Client sends two UDP calls. One to _Mind_ is required and another to _Memory_ is optional.
    2.  _Mind_ loads any necessary protocols and algorithms, verifies authentication, runs the processes, and returns data to _Output_
        1.  If the answer is already stored in _Memory_, the mind does no processing, only authentication and return to _Output_.
    3.  _Output_ checks structural integrity to match protocols and authenticates data to return to _Client_ and _Memory_
    4.  _Client_ is satisfied.
    5.  _Memory_ adds or updates appropriately to the data stores.
