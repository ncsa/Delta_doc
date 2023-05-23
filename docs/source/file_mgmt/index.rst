Data Management
================

**File Systems**
----------------

Each user has a home directory, $HOME, located at /u/$USER.

For example, a user (with username auser) who has an allocated project
with a local project serial code **abcd** will see the following entries
in their ``$HOME`` and entries in the project and scratch file systems.
To determine the mapping of ACCESS project to local project please use
the ``accounts`` command.

Directory access changes can be made using the
```facl`` <https://linux.die.net/man/1/setfacl>`__ command. Contact
help@ncsa.illinois.edu if you need assistance with enabling access to
specific users and projects.

::

   $ ls -ld /u/$USER
   drwxrwx---+ 12 root root 12345 Feb 21 11:54 /u/$USER

   $ ls -ld /projects/abcd
   drwxrws---+  45 root   delta_abcd      4096 Feb 21 11:54 /projects/abcd

   $ ls -l /projects/abcd
   total 0
   drwxrws---+ 2 auser delta_abcd 6 Feb 21 11:54 auser
   drwxrws---+ 2 buser delta_abcd 6 Feb 21 11:54 buser
   ...

   $ ls -ld /scratch/abcd
   drwxrws---+  45 root   delta_abcd      4096 Feb 21 11:54 /scratch/abcd

   $ ls -l /scratch/abcd
   total 0
   drwxrws---+ 2 auser delta_abcd 6 Feb 21 11:54 auser
   drwxrws---+ 2 buser delta_abcd 6 Feb 21 11:54 buser
   ...

To avoid issues when file systems become unstable or non-responsive, we
recommend not putting symbolic links from $HOME to the project and
scratch spaces.

| 

/tmp on compute nodes (job duration)

The high performance ssd storage (740GB cpu, 1.5TB gpu) is available in
/tmp (*unique to each node and job–not a shared filesystem*) and may
contain less than the expected free space if the node(s) are running
multiple jobs. Codes that need to perform i/o to many small files should
target /tmp on each node of the job and save results to other
filesystems before the job ends.

Transferring Data
--------------------
To transfer files to and from the Delta system :

GUI apps need to support DUO 2-factor authentication

Many GUI applications that support ssh/scp/sftp will work with DUO. A
good first step is to use the interactive (not stored/saved) password
option with those apps. The interactive login should present you with
the 1st password prompt (your kerberos password) followed by the 2nd
password prompt for DUO (push to device or passcode from DUO app).

| 

-  scp - to be used for small to modest transfers to avoid impacting the
   usability of the Delta login node (*login.delta.ncsa.illinois.edu*).

-  rsync - to be used for small to modest transfers to avoid impacting
   the usability of the Delta login node.

   -  https://campuscluster.illinois.edu/resources/docs/storage-and-data-guide/
      (scp, sftp, rsync)

-  Globus - to be used for large data transfers.

   Upgrade your Globus Connect Personal

   Upgrade to at least version 3.2.0 before Dec 12, 2022. See:
   https://docs.globus.org/ca-update-2022/#notice

   -  Use the Delta collection "**NCSA Delta**".
   -  
   -  Please see the following documentation on using Globus

      -  https://docs.globus.org/how-to/get-started/

Sharing Files with Collaborators
--------------------------------


Access Controls
----------------

Quotas and Policies
---------------------
