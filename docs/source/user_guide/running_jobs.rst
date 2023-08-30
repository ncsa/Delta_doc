Running Jobs
===============

Accounting
-----------

The charge unit for Delta is the service unit (SU). 
This corresponds to the equivalent use of one compute core utilizing less than or equal to 2G of memory for one hour, or 1 GPU or fractional GPU using less than the corresponding amount of memory or cores for 1 hour (see table below). 
**Charges are based on the resources that are reserved for your job and do not necessarily reflect how the resources are used.**
Charges are based on either the number of cores or the fraction of the memory requested, whichever is larger. 
The minimum charge for any job is 1 SU.


+------------------------+-----------------------------------+
| Node Type              | Service Unit Equivalence          |
+                        +-------+--------------+------------+
|                        | Cores | GPU Fraction | Host Memory|
+========================+=======+==============+============+
| CPU Node               | 1     | N/A          | 2 GB       |
+----------+-------------+-------+--------------+------------+
| GPU Node | Quad A100   | 16    | 1 A100       | 62.5 GB    |
|          +-------------+-------+--------------+------------+
|          | Quad A40    | 16    | 1 A40        | 62.5 GB    |
|          +-------------+-------+--------------+------------+
|          | 8-way A100  | 16    | 1 A100       | 250 GB     |
|          +-------------+-------+--------------+------------+
|          | 8-way MI100 | 16    | 1 MI100      | 250 GB     |
+----------+-------------+-------+--------------+------------+

Note, a weighting factor will discount the charge for the reduced-precision A40 nodes, as well as the novel AMD MI100 based node - this will be documented through the ACCESS SU converter.

Local Account Charging
~~~~~~~~~~~~~~~~~~~~~~~

Use the ``accounts`` command to list the accounts available for charging. 
CPU and GPU resources will have individual charge names. 
For example, in the following, **``abcd-delta-cpu``** and **``abcd-delta-gpu``** are available for user kingda to use for the CPU and GPU resources.

.. code-block::

   $ accounts
   Project Summary for User 'kingda':

   Project         Description                    Balance (Hours)    Deposited (Hours)
   --------------  ---------------------------  -----------------  -------------------
   bbka-delta-gpu  ncsa/delta staff allocation            5000000              5000000
   bbka-delta-cpu  ncsa/delta staff allocation          100000000            100000000 

Job Accounting Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  A node-exclusive job that runs on a compute node for one hour will be
   charged 128 SUs (128 cores x 1 hour)
-  A node-exclusive job that runs on a 4-way GPU node for one hour will
   be charge 4 SUs (4 GPU x 1 hour)
-  A node-exclusive job that runs on a 8-way GPU node for one hour will
   be charge 8 SUs (8 GPU x 1 hour)

QOSGrpBillingMinutes
~~~~~~~~~~~~~~~~~~~~~~

If you see QOSGrpBillingMinutes under the Reason column for the squeue command, as in:

.. code-block::

                JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
              1204221       cpu    myjob     .... PD       0:00      5 (QOSGrpBillingMinutes)

Then the resource allocation specified for the job (i.e. xyzt-delta-cpu) does not have sufficient balance to run the job based on the number of resources requested and the wall-clock time. 
Sometimes it may be other jobs from the same project, also in the QOSGrpBillingMinutes state, using the same resource allocation that are preventing a job that would normally "fit" from running.
To resolve this, the PI of the project needs to put in a supplement request using the same XRAS proposal system that was used for the current award, see :ref:`all_sup`.

Reviewing Job Charges for a Project (jobcharge)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

jobcharge in /sw/user/scripts/ will show job charges by user for a project. Example usage:

.. raw:: html

   <details>
   <summary><a><b>jobcharge_grp.py</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

   [arnoldg@dt-login03 ]$ jobcharge bbka-delta-gpu -b 10 --detail | tail -15
   106  1662443  gpuMI100x8                 0  nan                                                               kingda           bash                                    2023-04-06T09:39:01              0       0
   107  1662444  gpuMI100x8               291  billing=1000,cpu=2,gres/gpu:mi100=1,gres/gpu=1,mem=3G,node=1      kingda           bash                                    2023-04-06T09:44:11           1000       0.08
   108  1662449  gpuMI100x8               614  billing=1000,cpu=2,gres/gpu:mi100=1,gres/gpu=1,mem=3G,node=1      kingda           bash                                    2023-04-06T10:07:23           1000       0.17
   109  1662477  gpuMI100x8               446  billing=1000,cpu=2,gres/gpu:mi100=1,gres/gpu=1,mem=3G,node=1      kingda           bash                                    2023-04-06T10:15:08           1000       0.12
   110  1662492  gpuMI100x8               760  billing=8000,cpu=2,gres/gpu:mi100=8,gres/gpu=8,mem=3G,node=1      kingda           bash                                    2023-04-06T10:28:00           8000       1.69
   111  1662511  gpuMI100x8-interactive  1521  billing=16000,cpu=128,gres/gpu:mi100=8,gres/gpu=8,mem=64G,node=1  arnoldg          bash                                    Unknown                      16000       6.76
   _____SUMMARY___________________
   User               Charge (SU)
   ---------------  -------------
   arnoldg                  25.76
   babreu                    6.66
   kingda                    2.06
   rmokos                    0.96
   svcdeltajenkins           0.23
   Total                    35.67

   [arnoldg@dt-login03 scripts]$ jobcharge bbka-delta-gpu -b 10
   Output for 2023-03-27-11:25:24 through 2023-04-06-11:25:24:
   User               Charge (SU)
   ---------------  -------------
   arnoldg                  26.04
   babreu                    6.66
   kingda                    2.06
   rmokos                    0.96
   svcdeltajenkins           0.23
   Total                    35.95

   [arnoldg@dt-login03 ]$ jobcharge bbka-delta-gpu -h
   usage: jobcharge [-h] [-m MONTH] [-y YEAR] [-b DAYSBACK] [-s STARTTIME] [-e ENDTIME] [--detail]
                    accountstring

   positional arguments:
     accountstring         account name

   optional arguments:
     -h, --help            show this help message and exit
     -m MONTH, --month MONTH
                           Month (1-12) Default is current month
     -y YEAR, --year YEAR  Year (20XX) default is current year
     -b DAYSBACK, --daysback DAYSBACK
                           Number of days back
     -s STARTTIME, --starttime STARTTIME
                           Start time string in format (format: %Y-%m-%d-%H:%M:%S)
                           Example:2023-01-03-01:23:21)
     -e ENDTIME, --endtime ENDTIME
                           End time time string in format (format: %Y-%m-%d-%H:%M:%S)
                           Example:2023-01-03-01:23:21)
     --detail              detail output, per-job [svchydroswmanage@hydrol1 scripts]$ 

.. raw:: html

   </details>
|

Refunds
~~~~~~~~

Refunds are considered, when appropriate, for jobs that failed due to circumstances beyond user control.

To request a refund, submit a support request (:ref:`help`). Please include the batch job ids and the standard error and output files produced by the job(s).

Accessing the Compute Nodes
-------------------------------

Delta implements the Slurm batch environment to manage access to the compute nodes. 
Use the Slurm commands to run batch jobs or for interactive access to compute nodes. 
See: https://slurm.schedmd.com/quickstart.html for an introduction to Slurm. 
There are two ways to access compute nodes on Delta.

Batch jobs can be used to access compute nodes. 
Slurm provides a convenient direct way to submit batch jobs, see: https://slurm.schedmd.com/heterogeneous_jobs.html#submitting. 
Slurm also supports job arrays for easy management of a set of similar jobs, see: https://slurm.schedmd.com/job_array.html.

Sample Slurm batch job scripts are provided in the :ref:`examples` section.

Direct SSH access to a compute node in a running batch job from a dt-loginNN node is enabled once the job has started:

.. code-block::

   $ squeue --job jobid
                JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
                12345       cpu     bash   gbauer  R       0:17      1 cn001

Then in a terminal session:

.. code-block::

   $ ssh cn001
   cn001.delta.internal.ncsa.edu (172.28.22.64)
     OS: RedHat 8.4   HW: HPE   CPU: 128x    RAM: 252 GB
     Site: mgmt  Role: compute
   $

See also, :ref:`mon_node`.

Scheduler
-------------

For information, see the Slurm quick reference guide: https://slurm.schedmd.com/quickstart.html

..  image:: images/running_jobs/slurm_summary.pdf
    :alt: Slurm quick reference guide
    :width: 500

.. _partitions:

Partitions (Queues)
-----------------------

Delta Production Default Partition Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

======================= ==================
Property                Value
======================= ==================
Default Memory per core 1000 MB
Default Wall-clock time 30 minutes
======================= ==================

Delta Production Partitions/Queues
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| Partition/Queue       | Node Type | Max Nodes         | Max Duration | Max Running in            | Charge Factor |
|                       |           |                   |              |                           |               |
|                       |           | per Job           |              | Queue/user*               |               |
+=======================+===========+===================+==============+===========================+===============+
| cpu                   | CPU       | TBD               | 48 hr        | TBD                       | 1.0           |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| cpu-interactive       | CPU       | TBD               | 30 min       | TBD                       | 2.0           |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| gpuA100x4             | quad-A100 | TBD               | 48 hr        | TBD                       | 1.0           |
|                       |           |                   |              |                           |               |
| gpuA100x4*            |           |                   |              |                           |               |
|                       |           |                   |              |                           |               |
| (* indicates this     |           |                   |              |                           |               |
| is the default        |           |                   |              |                           |               |
|                       |           |                   |              |                           |               |
| queue, but submit jobs|           |                   |              |                           |               |
|                       |           |                   |              |                           |               |
| to gpuA100x4)         |           |                   |              |                           |               |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| gpuA100x4-interactive | quad-A100 | TBD               | 1 hr         | TBD                       | 2.0           |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| gpuA100x8             | octa-A100 | TBD               | 48 hr        | TBD                       | 1.5           |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| gpuA100x8-interactive | octa-A100 | TBD               | 1 hr         | TBD                       | 3.0           |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| gpuA40x4              | quad-A40  | TBD               | 48 hr        | TBD                       | 0.5           |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| gpuA40x4-interactive  | quad-A40  | TBD               | 1 hr         | TBD                       | 1.0           |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| gpuMI100x8            | octa-MI100| TBD               | 48 hr        | TBD                       | 0.25          |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+
| gpuMI100x8-interactive| octa-MI100| TBD               | 1 hr         | TBD                       | 0.5           |
+-----------------------+-----------+-------------------+--------------+---------------------------+---------------+

sview View of Slurm Partitions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

..  image:: images/running_jobs/sview_sinfo.png
    :alt: sview view of Slurm partitions
    :width: 500

Node Policies
~~~~~~~~~~~~~

Node-sharing is the default for jobs. 
Node-exclusive mode can be obtained by specifying all the consumable resources for that node type or adding the following Slurm options:

.. code-block::

   --exclusive --mem=0

GPU NVIDIA MIG (GPU slicing) for the A100 will be supported at a future date.

Pre-emptive jobs will be supported at a future date.

Job Policies
----------------

The default job requeue or restart policy is set to not allow jobs to be automatically requeued or restarted (as of 12/19/2022).
To enable automatic requeue and restart of a job by Slurm, please add the following Slurm directive:

.. code-block::

   --requeue 

When a job is requeued due to an event like a node failure, the batch script is initiated from its beginning. 
Job scripts need to be written to handle automatically restarting from checkpoints.


.. _job_mgmt:

Job Management
-----------------

Batch jobs are submitted through a *job script* (as in the :ref:`examples`) using the sbatch command. 
Job scripts generally start with a series of Slurm *directives* that describe requirements of the job, such as number of nodes and wall time required, to the batch system/scheduler (Slurm directives can also be specified as options on the sbatch command line; command line options take precedence over those in the script). 
The rest of the batch script consists of user commands.

The syntax for sbatch is: **sbatch** [list of sbatch options] script_name. Refer to the sbatch man page for detailed information on the options.

squeue/scontrol/sinfo
~~~~~~~~~~~~~~~~~~~~~

Commands that display batch job and partition information.

+-------------------------+-------------------------------------------+
| Slurm Example Command   | Description                               |
+=========================+===========================================+
| squeue -a               | Lists the status of all jobs on the       |
|                         | system.                                   |
+-------------------------+-------------------------------------------+
| squeue -u $USER         | Lists the status of all your jobs in the  |
|                         | batch system.                             |
+-------------------------+-------------------------------------------+
| squeue -j JobID         | Lists nodes allocated to a running job in |
|                         | addition to basic information..           |
+-------------------------+-------------------------------------------+
| scontrol show job JobID | Lists detailed information on a particular|
|                         | job.                                      |
+-------------------------+-------------------------------------------+
| sinfo -a                | Lists summary information on all the      |
|                         | partition.                                |
+-------------------------+-------------------------------------------+

See the man pages for other available options.

srun
~~~~~

The **srun** command initiates an interactive job on compute nodes.

For example, the following command will run an interactive job in the gpuA100x4 partition with a wall-clock time limit of 30 minutes, using one node and 16 cores per node and 1 GPU:

.. code-block::

   srun -A account_name --time=00:30:00 --nodes=1 --ntasks-per-node=16 \
   --partition=gpuA100x4 --gpus=1 --mem=16g --pty /bin/bash

After you enter the command, you will have to wait for Slurm to start the job. 
As with any job, your interactive job will wait in the queue until the specified number of nodes is available. 
If you specify a small number of nodes for smaller amounts of time, the wait should be shorter because your job will backfill among larger jobs. 
You will see something like this:

.. code-block::

   srun: job 123456 queued and waiting for resources

Once the job starts, you will see:

.. code-block::

   srun: job 123456 has been allocated resources

You will also be presented with an interactive shell prompt on the launch node. 
At this point, you can use the appropriate command to start your program.

When you are done with your work, you can use the ``exit`` command to end the job.

scancel
~~~~~~~~

The scancel command deletes a queued job or terminates a running job. The example below deletes/terminates the job with the associated JobID.

.. code-block::

   scancel JobID 

Job Status
~~~~~~~~~~~

If the NODELIST(REASON) is MaxGRESPerAccount, that means that a user has exceeded the number of cores or GPUs allotted per user or project for a given partition.

Useful Batch Job Environment Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

+-------------------------+-------------------------------------------+----------------------------------------------+
| Description             | Slurm Environment Variable                | Detail Description                           |
+=========================+===========================================+==============================================+
| Array JobID             | $SLURM_ARRAY_JOB_ID                       | Each member of a job array is assigned       |
|                         |                                           |                                              |
|                         | $SLURM_ARRAY_TASK_ID                      | a unique identifier                          |
+-------------------------+-------------------------------------------+----------------------------------------------+
| Job Submission Directory| $SLURM_SUBMIT_DIR                         | By default, jobs start in the directory      |
|                         |                                           |                                              |
|                         |                                           | that the job was submitted from. So the      |
|                         |                                           |                                              |
|                         |                                           | "cd $SLURM_SUBMIT_DIR" command is not needed.|
+-------------------------+-------------------------------------------+----------------------------------------------+
| JobID                   | $SLURM_JOB_ID                             | Job identifier assigned to the job           |
+-------------------------+-------------------------------------------+----------------------------------------------+
| Machine(node) list      | $SLURM_NODELIST                           | Variable name that contains the list of      |
|                         |                                           |                                              |
|                         |                                           | nodes assigned to the batch job              |
+-------------------------+-------------------------------------------+----------------------------------------------+

See the sbatch man page for additional environment variables available.

.. _mon_node:

Monitoring a Node During a Job
---------------------------------

You have SSH access to nodes in your running job(s). Some of the basic monitoring tools are demonstrated in the example transcript below. Screen shots are appended so that you can see the output from the tools. Most common Linux utilities are available from the compute nodes (free, strace, ps, and so on).

.. code-block::

   [arnoldg@dt-login03 python]$ squeue -u $USER
                JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
              1214412 gpuA40x4- interact  arnoldg  R       8:14      1 gpub045
   [arnoldg@dt-login03 python]$ ssh gpub045
   gpub045.delta.internal.ncsa.edu (141.142.145.145)
     OS: RedHat 8.4   HW: HPE   CPU: 64x    RAM: 252 GB
   Last login: Wed Dec 14 09:45:26 2022 from 141.142.144.42
   [arnoldg@gpub045 ~]$ nvidia-smi

   [arnoldg@gpub045 ~]$ module load nvtop
   ---------------------------------------------------------------------------------------------------------------------
   The following dependent module(s) are not currently loaded: cuda/11.6.1 (required by: ucx/1.11.2, openmpi/4.1.2)
   ---------------------------------------------------------------------------------------------------------------------

   The following have been reloaded with a version change:
   1) cuda/11.6.1 => cuda/11.7.0

   [arnoldg@gpub045 ~]$ nvtop

   [arnoldg@gpub045 ~]$ module load anaconda3_gpu
   [arnoldg@gpub045 ~]$ nvitop

   [arnoldg@gpub045 ~]$ top -u $USER

nvidia-smi:

..  image:: images/running_jobs/01_nvidia-smi.png
    :alt: nvidia smi
    :width: 1000px

nvtop:

..  image:: images/running_jobs/02_nvtop.png
    :alt: nvtop
    :width: 1000px

nvitop:

..  image:: images/running_jobs/03_nvitop.png
    :alt: nvitop
    :width: 1000px

top -u $USER:

..  image:: images/running_jobs/04_top.png
    :alt: top
    :width: 1000px

Monitoring Nodes Using Grafana
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Navigate to: https://metrics.ncsa.illinois.edu

#. Sign in (top-right).

   .. image:: images/running_jobs/metrics_signin_icon.png
      :alt: sign in icon
      :width: 400

#. Navigate to the Delta metrics of interest.

   ..  image:: images/running_jobs/06_grafana_metrics_home.png
       :alt: metrics home
       :width: 1000px

   You may choose a node from the list of nodes and get detail information in real time.

   ..  image:: images/running_jobs/07_grafana_metrics_details.png
       :alt: get detailed info
       :width: 1000px

Interactive Sessions
-------------------------

Interactive sessions can be implemented in several ways, depending on what is needed. To start up a bash shell terminal on a CPU or GPU node:

- Single core with 16GB of memory, with one task on a CPU node

  .. code-block::

     srun --account=account_name --partition=cpu-interactive \
       --nodes=1 --tasks=1 --tasks-per-node=1 \
       --cpus-per-task=4 --mem=16g \
       --pty bash

- Single core with 20GB of memory, with one task on a A40 GPU node

  .. code-block::

     srun --account=account_name --partition=gpuA40x4-interactive \
       --nodes=1 --gpus-per-node=1 --tasks=1 \
       --tasks-per-node=16 --cpus-per-task=1 --mem=20g \
       --pty bash 

MPI Interactive Jobs: Use salloc Followed by srun
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Interactive jobs are already a child process of srun, therefore, one cannot srun (or mpirun) applications from within them. 
Within standard batch jobs submitted via sbatch, use ``srun`` to launch MPI codes. 
For true interactive MPI, use ``salloc`` in place of srun shown above, then "srun my_mpi.exe" after you get a prompt from salloc (exit to end the salloc interactive allocation).

.. raw:: html

   <details>
   <summary><a><b>interactive MPI, salloc and srun</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

   [arnoldg@dt-login01 collective]$ cat osu_reduce.salloc
   salloc --account=bbka-delta-cpu --partition=cpu-interactive \
     --nodes=2 --tasks-per-node=4 \
     --cpus-per-task=2 --mem=0

   [arnoldg@dt-login01 collective]$ ./osu_reduce.salloc
   salloc: Pending job allocation 1180009
   salloc: job 1180009 queued and waiting for resources
   salloc: job 1180009 has been allocated resources
   salloc: Granted job allocation 1180009
   salloc: Waiting for resource configuration
   salloc: Nodes cn[009-010] are ready for job
   [arnoldg@dt-login01 collective]$ srun osu_reduce

   # OSU MPI Reduce Latency Test v5.9
   # Size       Avg Latency(us)
   4                       1.76
   8                       1.70
   16                      1.72
   32                      1.80
   64                      2.06
   128                     2.00
   256                     2.29
   512                     2.39
   1024                    2.66
   2048                    3.29
   4096                    4.24
   8192                    2.36
   16384                   3.91
   32768                   6.37
   65536                  10.49
   131072                 26.84
   262144                198.38
   524288                342.45
   1048576               687.78
   [arnoldg@dt-login01 collective]$ exit
   exit
   salloc: Relinquishing job allocation 1180009
   [arnoldg@dt-login01 collective]$ 

.. raw:: html

   </details>
|

Interactive X11 Support
~~~~~~~~~~~~~~~~~~~~~~~

To run an X11 based application on a compute node in an interactive session, the use of the ``--x11`` switch with ``srun`` is needed. 
For example, to run a single core job that uses 1G of memory with X11 (in this case an xterm) do the following:

.. code-block::

   srun -A abcd-delta-cpu  --partition=cpu-interactive \
     --nodes=1 --tasks=1 --tasks-per-node=1 \
     --cpus-per-task=2 --mem=16g \
     --x11  xterm

.. _file-system-dependency-specification-for-jobs-1:

File System Dependency Specification for Jobs
---------------------------------------------

Please see the :ref:`depend_arch` section in System Architecture for information on setting job file system dependencies for jobs.

Jobs that do not specify a dependency on WORK (/projects) and SCRATCH (/scratch) will be assumed to depend only on the HOME (/u) file system.


.. _examples:

Sample Scripts
----------------

Serial Jobs on CPU Nodes
~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <details open>
   <summary><a><b>serial example script</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

   $ cat job.slurm
   #!/bin/bash
   #SBATCH --mem=16g
   #SBATCH --nodes=1
   #SBATCH --ntasks-per-node=1
   #SBATCH --cpus-per-task=4    # <- match to OMP_NUM_THREADS
   #SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
   #SBATCH --account=account_name
   #SBATCH --job-name=myjobtest
   #SBATCH --time=00:10:00      # hh:mm:ss for the job
   #SBATCH --constraint="scratch"
   ### GPU options ###
   ##SBATCH --gpus-per-node=2
   ##SBATCH --gpu-bind=none     # <- or closest
   ##SBATCH --mail-user=you@yourinstitution.edu
   ##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options


   module reset # drop modules and explicitly load the ones needed
                # (good job metadata and reproducibility)
                # $WORK and $SCRATCH are now set
   module load python  # ... or any appropriate modules
   module list  # job documentation and metadata
   echo "job is starting on `hostname`"
   srun python3 myprog.py

.. raw:: html

   </details>
|

MPI on CPU Nodes
~~~~~~~~~~~~~~~~

.. raw:: html
   
   <details>
   <summary><a><b>mpi example script</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

   #!/bin/bash
   #SBATCH --mem=16g
   #SBATCH --nodes=2
   #SBATCH --ntasks-per-node=32
   #SBATCH --cpus-per-task=2    # <- match to OMP_NUM_THREADS
   #SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
   #SBATCH --account=account_name
   #SBATCH --job-name=mympi
   #SBATCH --time=00:10:00      # hh:mm:ss for the job
   #SBATCH --constraint="scratch"
   ### GPU options ###
   ##SBATCH --gpus-per-node=2
   ##SBATCH --gpu-bind=none     # <- or closest ##SBATCH --mail-user=you@yourinstitution.edu
   ##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options

   module reset # drop modules and explicitly load the ones needed
                # (good job metadata and reproducibility)
                # $WORK and $SCRATCH are now set
   module load gcc/11.2.0 openmpi  # ... or any appropriate modules
   module list  # job documentation and metadata
   echo "job is starting on `hostname`"
   srun osu_reduce

.. raw:: html

   </details>
|

OpenMP on CPU Nodes
~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <details>
   <summary><a><b>openmp example script</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

   #!/bin/bash
   #SBATCH --mem=16g
   #SBATCH --nodes=1
   #SBATCH --ntasks-per-node=1
   #SBATCH --cpus-per-task=32   # <- match to OMP_NUM_THREADS
   #SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
   #SBATCH --account=account_name
   #SBATCH --job-name=myopenmp
   #SBATCH --time=00:10:00      # hh:mm:ss for the job
   #SBATCH --constraint="scratch"
   ### GPU options ###
   ##SBATCH --gpus-per-node=2
   ##SBATCH --gpu-bind=none     # <- or closest
   ##SBATCH --mail-user=you@yourinstitution.edu
   ##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options

   module reset # drop modules and explicitly load the ones needed
                # (good job metadata and reproducibility)
                # $WORK and $SCRATCH are now set
   module load gcc/11.2.0  # ... or any appropriate modules
   module list  # job documentation and metadata
   echo "job is starting on `hostname`"
   export OMP_NUM_THREADS=32
   srun stream_gcc 

.. raw:: html

   </details>
|

Hybrid (MPI + OpenMP or MPI+X) on CPU Nodes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <details>
   <summary><a><b>mpi+x example script</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

   #!/bin/bash
   #SBATCH --mem=16g
   #SBATCH --nodes=2
   #SBATCH --ntasks-per-node=4
   #SBATCH --cpus-per-task=4    # <- match to OMP_NUM_THREADS
   #SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
   #SBATCH --account=account_name
   #SBATCH --job-name=mympi+x
   #SBATCH --time=00:10:00      # hh:mm:ss for the job
   #SBATCH --constraint="scratch"
   ### GPU options ###
   ##SBATCH --gpus-per-node=2
   ##SBATCH --gpu-bind=none     # <- or closest
   ##SBATCH --mail-user=you@yourinstitution.edu
   ##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options

   module reset # drop modules and explicitly load the ones needed
                # (good job metadata and reproducibility)
                # $WORK and $SCRATCH are now set
   module load gcc/11.2.0 openmpi # ... or any appropriate modules
   module list  # job documentation and metadata
   echo "job is starting on `hostname`"
   export OMP_NUM_THREADS=4
   srun xthi 

.. raw:: html

   </details>
|

4 GPUs Together on a Compute Node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <details>
   <summary><a><b>4 gpus example script</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

   #!/bin/bash
   #SBATCH --job-name="a.out_symmetric"
   #SBATCH --output="a.out.%j.%N.out"
   #SBATCH --partition=gpuA100x4
   #SBATCH --mem=208G
   #SBATCH --nodes=1
   #SBATCH --ntasks-per-node=4  # could be 1 for py-torch
   #SBATCH --cpus-per-task=16   # spread out to use 1 core per numa, set to 64 if tasks is 1
   #SBATCH --constraint="scratch"
   #SBATCH --gpus-per-node=4
   #SBATCH --gpu-bind=closest   # select a cpu close to gpu on pci bus topology
   #SBATCH --account=bbjw-delta-gpu
   #SBATCH --exclusive  # dedicated node for this job
   #SBATCH --no-requeue
   #SBATCH -t 04:00:00

   export OMP_NUM_THREADS=1  # if code is not multithreaded, otherwise set to 8 or 16
   srun -N 1 -n 4 ./a.out > myjob.out
   # py-torch example, --ntasks-per-node=1 --cpus-per-task=64
   # srun python3 multiple_gpu.py

.. raw:: html

   </details>
|

Parametric / Array / HTC Jobs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Not yet implemented.
