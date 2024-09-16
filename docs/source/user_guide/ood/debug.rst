.. _debug-ood:

Debugging Open OnDemand
===========================

Open OnDemand issues can be more difficult to debug than when you're logged in to Delta through ``ssh`` in a terminal.
However, reviewing the output files from your session can provide important clues on what went wrong. 

Review Session Output Files
------------------------------

#. Go to **My Interactive Sessions**.

   .. figure:: ../images/ood/ood-my-interactive-sessions.jpg
      :alt: My interactive sessions button in the upper OOD menu.
      :width: 700

#. Find the interactive session of interest from the list and click the **Session ID**.

   .. figure:: ../images/ood/ood-session-id.jpg
      :alt: Example interactive session wit the Session ID field highlighted.
      :width: 500

#. Browse the output files to look for clues of what went wrong, the ``user_defined_context.json`` and ``output.log`` files are highlighted below.

user_defined_context.json
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``user_defined_context.json`` file shows the options you input to launch the session. Did you request the correct amount of RAM in the correct format? 

Use Slurm format, e.g. 4096M, 10G. If left blank, 1000 MB will be allocated per CPU core requested.

The following ``user_defined_context.json`` example is for a 30 minute, 1 CPU job request with default memory.

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
~~~~~~~~~~~

The last lines in ``output.log`` should tell you why the job ended. The following example is the last line of an ``output.log`` file for a job that ended because it reached the end of its requested wall-clock time.

.. code-block:: terminal

   slurmstepd: error: *** JOB 4214572 ON cn001 CANCELLED AT 2024-07-24T14:06:53 DUE TO TIME LIMIT ***

|
