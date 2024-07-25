.. _debug-ood:

Debugging Open OnDemand
===========================

Issues you encounter when using Open OnDemand can be more difficult to debug than when you're logged in to Delta through ``ssh`` in a terminal.
However, there are some places to look for clues, when things go sideways.

#. Go to **My Interactive Sessions**.

#. Find the interactive session of interest from the list and click the **Session ID**.

   This will take you to a list of output files from your session. Browse these to look for clues of what went wrong, a few are highlighted.

user_defined_context.json
---------------------------

This file shows the options you input to launch the session. Some key items to look for include:

- Did you request an account that you have access to? 

  Accounts available to you are listed under “Project” when you run the ``accounts`` command.

- Did you request the correct amount of RAM in the correct format? 

  Use Slurm format, e.g. 4096M, 10G. If left blank, 1000 MB will be allocated per CPU core requested.

The following ``user_defined_context.json`` example for a 30 minute, 1 CPU job request with default memory.

.. code-block:: terminal

   bc_account	"bbka-delta-cpu"
   bc_partition	"cpu-interactive"
   bc_duration	"00-00:30:00"
   bc_reservation	""
   bc_num_slots	"1"
   bc_num_memory	""
   bc_num_gpus	"0"
   bc_email_on_started	"0"
   working_dir	""

output.log
------------

The last lines in this file should tell you why the job ended. For example, the following job was ended because it reached the end of its requested wall-clock time (duration).

.. code-block:: terminal

   slurmstepd: error: *** JOB 4214572 ON cn001 CANCELLED AT 2024-07-24T14:06:53 DUE TO TIME LIMIT ***

