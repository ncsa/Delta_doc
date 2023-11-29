Job Accounting
================

The charge unit for Delta is the service unit (SU). 
This corresponds to the equivalent use of one compute core utilizing less than or equal to 2G of memory for one hour, or 1 GPU or fractional GPU using less than the corresponding amount of memory or cores for 1 hour (see table below). 
**Charges are based on the resources that are reserved for your job and do not necessarily reflect how the resources are used.**
Charges are based on either the number of cores or the fraction of the memory requested, whichever is larger. 
The minimum charge for any job is 1 SU.

.. table:: Service Unit Equivalents by Node Type

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

Note that a weighting factor will discount the charge for the reduced-precision A40 nodes, as well as the novel AMD MI100 based node - this will be documented through the ACCESS SU converter.

Also note that 1 GB of memory here means 1e9 bytes (1,000,000,000), not 2^30 bytes (1,073,741,824).

Local Account Charging
-------------------------

Use the ``accounts`` command to list the accounts available for charging. 
CPU and GPU resources will have individual charge names. 
For example, in the following, **bbka-delta-cpu** and **bbka-delta-gpu** are available for user kingda to use for the CPU and GPU resources.

.. code-block::

   $ accounts
   Project Summary for User 'kingda':

   Project         Description                    Balance (Hours)    Deposited (Hours)
   --------------  ---------------------------  -----------------  -------------------
   bbka-delta-gpu  ncsa/delta staff allocation            5000000              5000000
   bbka-delta-cpu  ncsa/delta staff allocation          100000000            100000000 

Job Accounting Considerations
-------------------------------

-  A node-exclusive job that runs on a compute node for one hour will be
   charged 128 SUs (128 cores x 1 hour)
-  A node-exclusive job that runs on a 4-way GPU node for one hour will
   be charged 4 SUs (4 GPU x 1 hour)
-  A node-exclusive job that runs on a 8-way GPU node for one hour will
   be charged 8 SUs (8 GPU x 1 hour)

QOSGrpBillingMinutes
---------------------

If you see QOSGrpBillingMinutes under the Reason column for the ``squeue`` command, as in:

.. code-block::

                JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
              1204221       cpu    myjob     .... PD       0:00      5 (QOSGrpBillingMinutes)

Then the resource allocation specified for the job (e.g., xyzt-delta-cpu) does not have sufficient balance to run the job based on the number of resources requested and the wall-clock time. 
Sometimes it may be other jobs from the same project, also in the QOSGrpBillingMinutes state, using the same resource allocation, that are preventing a job that would normally "fit" from running.
To resolve this, the PI of the project needs to put in a supplement request using the same XRAS proposal system that was used for the current award, see :ref:`all_sup`.

Reviewing Job Charges for a Project (jobcharge)
-------------------------------------------------

``jobcharge`` in /sw/user/scripts/ will show job charges by user for a project. Example usage:

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
----------

Refunds are considered, when appropriate, for jobs that failed due to circumstances beyond user control.

To request a refund, submit a support request (:ref:`help`). Please include the batch job IDs and the standard error and output files produced by the job(s).
