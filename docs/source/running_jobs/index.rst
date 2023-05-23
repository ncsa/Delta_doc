Running Jobs
===============

Accounting
-------------------------

The charge unit for *Delta* is the Service Unit (SU). This corresponds
to the equivalent use of one compute core utilizing less than or equal
to 2G of memory for one hour, or 1 GPU or fractional GPU using less than
the corresponding amount of memory or cores for 1 hour (see table
below). *Keep in mind that your charges are based on the resources that
are reserved for your job and don't necessarily reflect how the
resources are used.* Charges are based on either the number of cores or
the fraction of the memory requested, whichever is larger. The minimum
charge for any job is 1 SU.

========= ============ ======================== ======= =======
Node Type              Service Unit Equivalence         
Cores     GPU Fraction Host Memory                      
CPU Node               1                        N/A     2 GB
GPU Node  Quad A100    16                       1 A100  62.5 GB
\         Quad A40     16                       1 A40   62.5 GB
\         8-way A100   16                       1 A100  250 GB
\         8-way MI100  16                       1 MI100 250 GB
========= ============ ======================== ======= =======

Please note that a weighting factor will discount the charge for the
reduced-precision A40 nodes, as well as the novel AMD MI100 based node -
this will be documented through the ACCESS SU converter.

Local Account Charging
~~~~~~~~~~~~~~~~~~~~~~

Use the ``accounts`` command to list the accounts available for
charging. CPU and GPU resources will have individual charge names. For
example in the following, **``abcd-delta-cpu``** and
**``abcd-delta-gpu``** are available for user gbauer to use for the CPU
and GPU resources.

::

   $ accounts
   Project Summary for User 'kingda':

   Project         Description                    Balance (Hours)    Deposited (Hours)
   --------------  ---------------------------  -----------------  -------------------
   bbka-delta-gpu  ncsa/delta staff allocation            5000000              5000000
   bbka-delta-cpu  ncsa/delta staff allocation          100000000            100000000 

Job Accounting Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  A node-exclusive job that runs on a compute node for one hour will be
   charged 128 SUs (128 cores x 1 hour)
-  A node-exclusive job that runs on a 4-way GPU node for one hour will
   be charge 4 SUs (4 GPU x 1 hour)
-  A node-exclusive job that runs on a 8-way GPU node for one hour will
   be charge 8 SUs (8 GPU x 1 hour)

QOSGrpBillingMinutes
~~~~~~~~~~~~~~~~~~~~

If you see QOSGrpBillingMinutes under the Reason column for the squeue
command, as in

::

                JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
              1204221       cpu    myjob     .... PD       0:00      5 (QOSGrpBillingMinutes)

then the resource allocation specified for the job (i.e. xyzt-delta-cpu
) does not have sufficient balance to run the job based on the # of
resources requested and the wallclock time. Sometimes it maybe other
jobs from the same project that in the same QOSGrpBillingMinutes state
are could cause other jobs using the same resource allocation that are
preventing a job that would "fit" from running. The PI of the project
needs to put in a supplement request using the same XRAS proposal system
that was used for the current award (ACCESS or NCSA).

Reviewing job charges for a project ( jobcharge )
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

jobcharge in /sw/user/scripts/ will show job charges by user for a
project. Example usage:

::

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

Sample Scripts
-------------------------

-  Serial jobs on CPU nodes

   ::

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

   | 

-  MPI on CPU nodes

   ::

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

   | 

-  OpenMP on CPU nodes

   ::

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

   | 

-  Hybrid (MPI + OpenMP or MPI+X) on CPU nodes

   ::

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

   | 

-  4 gpus together on a compute node

   ::

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

   | 

-  Parametric / Array / HTC jobs

Interactive Jobs
-------------------------

Job Management
-----------------

Job Status
-----------------

Monitoring a Node During a Job
---------------------------------

Refunds
------------
