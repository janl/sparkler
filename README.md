# Sparkler

A [Sparkle][] backend that lives inside [CouchDB][].

[sparkle]: http://sparkle.andymatuschak.org/
[CouchDB]: http://couchdb.apache.org/

## What is this for?

If you have a Mac OS X application are a tad annoyed at managing your AppCast
Spakler is for you.

## Setup

Requires [CouchApp][] and CouchDB. A good way to get a hosted CouchDB instance
is <http://www.couch.io/get>, but this will run in any custom CouchDB 0.11
or 1.0 or later.

    $ sudo easy_install -U couchapp

[CouchApp]: http://github.com/couchapp/couchapp

Quickstart:

    $ git clone git://github.com/janl/sparkler.git
    $ cd sparkler
    $ couchapp init
    # edit / update _docs/<version>
    $ couchapp push . http://url-to-your-couchdb/database

Set `SUFeedUrl` in your `Info.plist` to `https://yourhost/yourdatabase/_design/appcast/_rewrite/cast`


## Publish an Update

Edit/create `_docs/<versionnumber>`:

 - `_attachments` includes `YourApp.zip`.
 - `_id` includes your version number.
 - `description.html` includes your release notes.
 - `pubDate.txt` incudes your publication date.
 - `title` includes your release title
   (TODO, find what `title` is good for, it is in the Sparkle docs but not
   anywhere in the UI)

Publish:

    $ couchapp push . http://url-to-your-couchdb/database


## Apps that use Sparkler

 - [CouchDBX](http://www.couch.io/get) (recursion alert)


## Copyright

Sparkler is (c) 2010 Jan Lehnardt <jan@apache.org>


## License

Apache 2.0 — See <http://www.apache.org/licenses/LICENSE-2.0.html>
