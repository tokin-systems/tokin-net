# TOKIN-NET

## TODO

### Features

* Deploy schemas for memory components

### Housekeeping

* Upgrade NPM

## Components

* Mind - Keeper of algos and protocols. Supervises network health.
* Memory - Distributed systems
  * Blockchain - transactions and events
  * GraphDB - relationships
    * Subject/predicate/object notation
    * JSON-LD and NTriples (N3/Turtle/RDF) data
  * p2p - content and data blobs
  * K/V - game and application state
* Output - validates and verifies results, sends to client and memory
* Client - requests data and adds transactions

## Process Flows

Client wants a response to something

1.  Client sends two UDP calls. One to _Mind_ is required and another to _Memory_ is optional.
2.  _Mind_ loads any necessary protocols and algorithms, verifies authentication, runs the processes, and returns data to _Output_
    1.  If the answer is already stored in _Memory_, the mind does no processing, only authentication and return to _Output_.
3.  _Output_ checks structural integrity to match protocols and authenticates data to return to _Client_ and _Memory_
4.  _Client_ is satisfied.
5.  _Memory_ adds or updates appropriately to the data stores.

## Documentation

### Graph DB

```
/*
Get and Put

Inserting a triple in the database is extremely easy:

  var triple = { subject: "a", predicate: "b", object: "c" };
  db.put(triple, function(err) {
  // do something after the triple is inserted
});

Retrieving it through pattern-matching is extremely easy:

  db.get({ subject: "a" }, function(err, list) {
    console.log(list);
  });

It even supports a Stream interface:

  var stream = db.getStream({ predicate: "b" });
  stream.on("data", function(data) {
    console.log(data);
  });
*/
`
## To Discover

* Pseudovectors
* Pseudoscalars
* Pseudotensors
```
