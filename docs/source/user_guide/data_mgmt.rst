Data Management
================

.. _data-mgmt-filesystem:

File Systems
----------------

.. table:: File System Specs
   :widths: 15 12 24 10 10 29

   +----------------+---------------+---------------------------------------------------+---------------+---------------+--------------------------------------------+
   | File System    | Path          | Quota                                             | Snapshots     | Purged        | Key Features                               |
   +================+===============+===================================================+===============+===============+============================================+
   | HOME           | ``/u``        | **90 GB.** 600,000 files per user.                | No/TBA        | No            | Area for software, scripts, job files, and |
   |                |               |                                                   |               |               | so on. **Not** intended as a               |
   |                |               |                                                   |               |               | source/destination for I/O during jobs.    |
   |                |               |                                                   |               |               |                                            |
   +----------------+---------------+---------------------------------------------------+---------------+---------------+--------------------------------------------+
   | PROJECTS       | ``/projects`` | **500 GB.** Up to 1-25 TB by                      | No/TBA        | No            | Area for shared data for a project, common |
   |                |               | allocation request. Large requests                |               |               | data sets, software, results, and so on.   |
   |                |               | may have a monetary fee.                          |               |               |                                            |
   |                |               |                                                   |               |               |                                            |
   +----------------+---------------+---------------------------------------------------+---------------+---------------+--------------------------------------------+
   | WORK - **HDD** | ``/work/hdd`` | **1000 GB**. Up to 1-100 TB by allocation request.| No            | No            | Area for computation, largest allocations, |
   |                |               |                                                   |               |               | where I/O from jobs should occur.          |
   +----------------+---------------+---------------------------------------------------+---------------+---------------+--------------------------------------------+
   | WORK - **NVME**| ``/work/nvme``| NVME space is available upon request;             | No            | No            | Area for computation, NVME is best for lots| 
   |                |               | :ref:`submit a support request <general_support>`.|               |               | of **small** I/O from jobs.                |
   +----------------+---------------+---------------------------------------------------+---------------+---------------+--------------------------------------------+
   | SCRATCH        | ``/scratch``  | N/A                                               | No            | No            | Replaced by ``/work/hdd``. There is a      |
   |                |               |                                                   |               |               | symbolic link from ``/scratch`` to         |
   |                |               |                                                   |               |               | ``/work/hdd`` for the near-term to maintain|
   |                |               |                                                   |               |               | functionality of existing scripts.         |
   +----------------+---------------+---------------------------------------------------+---------------+---------------+--------------------------------------------+
   | /tmp           | ``/tmp``      | **0.74 (CPU) or 1.50 TB (GPU)**                   | No            | After each job| Locally attached disk for fast small file  |
   |                |               | shared or dedicated depending on                  |               |               | I/O.                                       |
   |                |               | node usage by job(s), no quotas in                |               |               |                                            |
   |                |               | place.                                            |               |               |                                            |
   |                |               |                                                   |               |               |                                            |
   +----------------+---------------+---------------------------------------------------+---------------+---------------+--------------------------------------------+

File System Notes
~~~~~~~~~~~~~~~~~~~

- Each user has a home directory, **$HOME**, located at ``/u/$USER``. For each project they are assigned to, they will also have access to shared file space under ``/projects`` and ``/scratch``.

  For example, a user (with username: **auser**) who has an allocated project with a local project serial code **abcd** will see the following entries in their $HOME and entries in the projects and scratch file systems.

  .. code-block:: bash
   
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

- Determine the mapping of ACCESS project to local project using the ``accounts`` command. View your file system usage with the ``quota`` command.

- Directory access changes can be made using the `facl <https://linux.die.net/man/1/setfacl>`_ command. 
  :ref:`Submit a support request <general_support>` if you need assistance enabling access for specific users and projects.

- A “module reset” in a job script populates **$WORK** and **$SCRATCH** environment variables automatically, or you may set them as ``WORK=/projects/<account>/$USER``, ``SCRATCH=/scratch/<account>/$USER``.

/tmp on Compute Nodes (Job Duration)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The high performance ssd storage (740GB CPU, 1.5TB GPU) is available in /tmp (*unique to each node and job – not a shared file system*) and may contain less than the expected free space if the node(s) are running multiple jobs. 
Codes that need to perform i/o to many small files should target /tmp on each node of the job and save results to other file systems before the job ends.

Quota Usage
------------

The ``quota`` command allows you to view your use of the file systems and use by your projects. 
Below is a sample output for a person, "<user>", who is in two projects: "aaaa" and "bbbb". 
The home directory quota does not depend on which project group the file is written with.

.. code-block::

   [<user>@dt-login01 ~]$ quota
   Quota usage for user <user>:
   -------------------------------------------------------------------------------------------
   | Directory Path | User | User | User  | User | User   | User |
   |                | Block| Soft | Hard  | File | Soft   | Hard |
   |                | Used | Quota| Limit | Used | Quota  | Limit|
   --------------------------------------------------------------------------------------
   | /u/<user>      | 20k  | 50G  | 27.5G | 5    | 600000 | 660000 |
   --------------------------------------------------------------------------------------
   Quota usage for groups user <user> is a member of:
   -------------------------------------------------------------------------------------
   | Directory Path | Group | Group | Group | Group | Group  | Group |
   |                | Block | Soft  | Hard  | File  | Soft   | Hard  |
   |                | Used  | Quota | Limit | Used  | Quota  | Limit |
   -------------------------------------------------------------------------------------------
   | /projects/aaaa | 8k    | 500G  | 550G  | 2     | 300000 | 330000 |
   | /projects/bbbb | 24k   | 500G  | 550G  | 6     | 300000 | 330000 |
   | /scratch/aaaa  | 8k    | 552G  | 607.2G| 2     | 500000 | 550000 |
   | /scratch/bbbb  | 24k   | 9.766T| 10.74T| 6     | 500000 | 550000 |
   ------------------------------------------------------------------------------------------

File Sharing
--------------

Users may share files from the /projects file system on Delta to external users via Globus. 

Create a directory to share from in your /projects directory.  If your four-character allocation code is "XXXX" then do something like: 

.. code-block::

    mkdir /projects/XXXX/globus_shared/
    mkdir /projects/XXXX/globus_shared/my_data/

Then move or copy whatever data you want to share to that directory. 

Follow the instructions on this `Globus sharing page <https://docs.globus.org/guides/tutorials/manage-files/share-files/>`_ to share that directory.  You will need to authenticate and connect to the "ACCESS Delta" endpoint to make this work.  Share the collection from the directory you created; in the above example: "/projects/XXXX/globus_shared/my_data/".  

.. _transfer:

Transferring Data
--------------------

.. note::

   | **GUI applications need to support Duo multi-factor authentication (MFA)**
   | Many GUI apps that support ``ssh``/``scp``/``sftp`` will work with Duo MFA. A good first step is to use the interactive (not stored/saved) password option with these apps. The interactive login should present you with the first password prompt (your Kerberos password) followed by the second password prompt for Duo (push to device or passcode from the Duo app).

Secure Copy (scp)
~~~~~~~~~~~~~~~~~~

Use ``scp`` for small to modest transfers to avoid impacting the usability of the :ref:`Delta login node <direct_access>`. Go to `Transferring Files - scp <https://docs.ncsa.illinois.edu/en/latest/common/transfer.html#cli-transfer-method-secure-copy-scp>`_ for instructions on using ``scp`` on NCSA computing resources.

rsync
~~~~~~~~~~

Use ``rsync`` for small to modest transfers to avoid impacting the usability of the :ref:`Delta login node <direct_access>`. Go to `Transferring Files - rsync <https://docs.ncsa.illinois.edu/en/latest/common/transfer.html#cli-transfer-method-secure-copy-scp>`_ for instructions on using ``rsync`` on NCSA computing resources.

.. _transfer-globus:

Globus
~~~~~~~~~

Use Globus for large data transfers. Globus is a web-based file transfer system that works in the background to move files between systems with Globus `endpoints <https://docs.globus.org/faq/globus-connect-endpoints/#what_is_an_endpoint>`_. 

Go to `Transferring Files - Globus <https://docs.ncsa.illinois.edu/en/latest/common/transfer.html#globus>`_ for instructions on using Globus with NCSA computing resources. 

The **Delta endpoint collection** names are: 

- "NCSA Delta" (authenticates with your NCSA identity)
- "ACCESS Delta" (authenticates with your ACCESS identity)

Infinite Memory Engine (IME)
-----------------------------------

What is DDN IME?
~~~~~~~~~~~~~~~~~

Infinite Memory Engine (IME®) is a DDN solution for fast data tiering between the compute nodes and a file system in a high-performance computing environment.

Conceptually, the storage subsystem looks like the following:

..  image:: images/data_mgmt/Delta_IME.png
    :alt: Storage subsystem
    :width: 400px

© DDN 2020

How to Use IME
~~~~~~~~~~~~~~~

The preferred way to use the Delta IME is as a **read-cache** for frequently read data and as a **write/read cache** for small file i/o.

It is possible to use exiting utilities and applications with files residing or created on /ime. 
Performance will be equal to or better than using /scratch directly for i/o to files.

.. warning::

   | **IME and metadata**
   | IME performance for directory/metadata operations is slower than /scratch (it is not the place to extract or copy millions of files). Do those operations (``rsync``, ``tar``, etc) in /scratch.

To get additional performance from the IME software features without changing i/o routines, use the posix2ime library (LD_PRELOAD'd), to intercept standard POSIX i/o calls with IME API calls. 
There is an included module, *posix2ime*, that does this for you (see more about posix2ime at :ref:`posix2`, below).

.. note::

   | **shared namespace: /ime , /scratch**
   | The /scratch and /ime file systems share the same namespace. The ``rm`` command will delete files on both file systems.

You can purge the contents of files from the cache, but not the presence of the file; see :ref:`purge`, below.

There are some important caveats when using the /ime file system for something other than a **read-cache**. See section 2.2 Data Consistency Model in the :download:`developer guide document <images/data_mgmt/IME1-4DeveloperGuide.pdf>`.

   *Users must maintain close-to-open consistency when multiple clients access the same files. 
   This requirement guarantees that any other client will see the latest changes made by one client as soon as the client opens the file. 
   A client must synchronize all file data and metadata changes when it closes a file and unconditionally retrieve a file’s attributes when it opens a file, ignoring any information it may have cached about the file. 
   IME implements an enhanced close-to-open consistency model, allowing IME to be lock free.*

IME Commands
~~~~~~~~~~~~~

See the man page for ``ime-ctl`` or the attached :download:`developer guide document <images/data_mgmt/IME1-4DeveloperGuide.pdf>` for details.

.. _purge:

Stage In and Out Single Files
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

The ``ime-ctl`` command is used to stage and purge files from the caching /ime file system:

.. code-block::

   ime-ctl --prestage 
   /ime/abcd/${USER}/file01

To sync the contents of a file created or changed that resides on /ime:

.. code-block::

   ime-ctl --sync /ime/abcd/${USER}/file01]]>
   To sync the contents of a file created or changed that resides on /ime

   ime-ctl --sync /ime/abcd/${USER}/file01

To purge the cached contents of a file on /ime:

.. code-block::

   ime-ctl --purge 
   /ime/abcd/${USER}/file01

Note that purging a file only clears the contents of the file from /ime.
The /scratch and /ime file systems share the same name space which allows files and directories to be seen from either the caching front-end /ime or back-end /scratch.

Staging Multiple Files and Directories
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

To recursively stage the contents of a directory and the files and directories, see below. In this case, a directory called /scratch/abcd/${USER}/data_di uses the recursive.

.. code-block::

   ime-ctl --prestage --recursive --block 
   /ime/abcd/${USER}/data_dir

The ``--block`` option ensures the stage or sync is complete before returning.

Checking File Stage/Cache Status
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

To check if a file has been staged to the IME cache in /ime or has its contents synced back to the back-end file system use the ``ime-ctl  --frag-stat`` command.

In this example, a file that was created as **/scratch/abcd/${USER}/file01** has not been staged to /ime. 
The file will be visible as **/ime/abcd/${USER}/file01**.
Not staged to /ime, all entries are showing "0" for the Dirty, Clean and Syncing entries:

.. code-block::

   $ 
   ime-ctl --frag-stat /ime/abcd/${USER}/file01
      File: `/ime/abcd/${USER}/file01'
            Number of bytes:
     Dirty: 0
     Clean: 0
   Syncing: 0
   Data on Slices:

After staging the file to /ime, the number of bytes in the "Clean" category shows that the data on the cache is current:

.. code-block::

   $ ime-ctl --prestage /ime/abcd/${USER}/file01
   $ ime-ctl --frag-stat /ime/abcd/${USER}/file01
      File: `/ime/abcd/${USER}/file01'
            Number of bytes:
     Dirty: 0
     Clean: 16777216
   Syncing: 0
   Data on Slices:  0

If the file **/ime/abcd/${USER}/file01** was modified (appended, replaced, and so on) one would see entries in the Dirty category:

.. code-block::

   $ ime-ctl --frag-stat /ime/abcd/${USER}/file01
      File: `/ime/abcd/${USER}/file01'
            Number of bytes:
     Dirty: 8388608
     Clean: 16777216
   Syncing: 0
   Data on Slices:  0

After using ``ime-ctl --sync`` to flush the changes to the back-end file system, the dirty entries will be back to 0:

.. code-block::

   $ ime-ctl --sync /ime/abcd/${USER}/file01
   $ ime-ctl --frag-stat /ime/abcd/${USER}/file01
      File: `/ime/abcd/${USER}/file01'
            Number of bytes:
     Dirty: 0
     Clean: 25165824
   Syncing: 0
   Data on Slices:  0

.. _posix2:

IME posix2ime Library
~~~~~~~~~~~~~~~~~~~~~~

The posix2ime module is available and loading it will LD_PRELOAD the library for your shell or batch script and all subsequent commands. 
The library is described at: `DDNStorage/posix_2_ime: POSIX to IME Native API (github.com) <https://github.com/DDNStorage/posix_2_ime>`_.

.. note::

   | **posix2ime requires dedicated nodes**
   | At this time, use of the posix2ime library requires dedicated (#SBATCH --exclusive) nodes for your job script or srun command.

.. code-block::

   #!/bin/bash 
   #SBATCH --mem=64g
   #SBATCH --nodes=4
   #SBATCH --ntasks-per-node=4
   #SBATCH --exclusive
   #SBATCH --cpus-per-task=16
   #SBATCH --partition=cpu
   #SBATCH --account=account_name    # <- match to a "Project" returned by the "accounts" command
   #SBATCH --time=00:15:00
   #SBATCH --job-name=posix2ime-ior-dedicated
    
   BFS_DIR=/scratch/bbka/arnoldg/ime_example
   IME_DIR=/ime/bbka/arnoldg/ime_example
   SAMPLE_INPUT_FILE=myinputfile
    
   # do many-files operations in /scratch before 
   # using ime: cd $BFS_DIR; tar xvf inputbundle.tar ...

   # bring the scratch directory into IME
   ime-ctl --recursive --block --prestage $IME_DIR

   # run the job/workflow in IME
   # do serialized commands (avoiding many-files types of operations)
   cd $IME_DIR
   stat $SAMPLE_INPUT_FILE

   # Use posix2ime for large block and/or parallel i/o 
   module load posix2ime
   time srun /u/arnoldg/ior/src/ior -F -b64m
   # turn off posix2ime
   unset LD_PRELOAD  # turns off posix2ime module

   # synchronize IME back out to the Scratch directory ( $BFS_DIR )
   ime-ctl --recursive --block --sync $IME_DIR

   exit

|
