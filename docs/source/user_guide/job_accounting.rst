Job Accounting
================

The charge unit for Delta is the service unit (SU). 
This corresponds to the equivalent use of one compute core utilizing less than or equal to 2G of memory for one hour, or 1 GPU or fractional GPU using less than the corresponding amount of memory or cores for 1 hour (see table below). 
**Charges are based on the resources that are reserved for your job and do not necessarily reflect how the resources are used.**
Charges are based on either the number of cores or the fraction of the memory requested, whichever is larger. 

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

The example ``jobcharge`` commands are showing results for the ``bbka-delta-gpu`` account. Accounts available to you are listed under "Project" when you run the ``accounts`` command.

.. code-block::

   [arnoldg@dt-login03 ~]$ jobcharge bbka-delta-gpu -d 10 --detail | tail -15
   141  3374332  gpuA40x4-interactive           1372  billing=1000,cpu=2,gres/gpu:a40=1,gres/gpu=1,mem=16G,node=1       arnoldg          ondemand/sys/dashbo
   ard/sys/jupyter-lab  2024-04-10T09:08:27       1000      0.38
   142  3375013  gpuA100x4                        11  billing=1000,cpu=1,gres/gpu:a100=1,gres/gpu=1,mem=1000M,node=1    svcdeltajenkins  bandwidthTest      
                        2024-04-10T17:20:07       1000      0
   143  3376558  gpuA100x4-interactive           443  billing=2000,cpu=1,gres/gpu:a100=1,gres/gpu=1,mem=16G,node=1      svcdeltajenkins  python             
                        2024-04-11T03:48:25       2000      0.25
   144  3376599  gpuA40x4                          5  billing=2000,cpu=4,gres/gpu:a40=4,gres/gpu=4,mem=128G,node=4      svcdeltajenkins  mpi_small          
                        2024-04-11T05:18:35       2000      0
   145  3376600  gpuA100x4                         5  billing=4000,cpu=4,gres/gpu:a100=4,gres/gpu=4,mem=128G,node=4     svcdeltajenkins  mpi_small          
                        2024-04-11T05:18:41       4000      0.01
   146  3376623  gpuA100x4-interactive           141  billing=2000,cpu=1,gres/gpu:a100=1,gres/gpu=1,mem=16G,node=1      svcdeltajenkins  python3            
                        2024-04-11T07:45:22       2000      0.08
   ____________SUMMARY____________
   User               Charge (SU)
   ---------------  -------------
   arnoldg                   1.7
   gbauer                    0.37
   jlong                     0.01
   rbrunner                  0.89
   svcdeltajenkins           3.52
   Total                     6.49

   [arnoldg@dt-login03 ~]$ jobcharge bbka-delta-gpu -d 10
   Charges for account bbka-delta-gpu from 2024-04-01-08:21:18 through 2024-04-11-08:21:18.
   User               Charge (SU)
   ---------------  -------------
   arnoldg                   1.7
   gbauer                    0.37
   jlong                     0.01
   rbrunner                  0.89
   svcdeltajenkins           3.52
   Total                     6.49

   [arnoldg@dt-login03 ~]$ jobcharge -h
   usage: jobcharge [-h] [-s STARTTIME] [-e ENDTIME] [--detail] [-m MONTH] [-y YEAR] [-d DAYSBACK] account
 
   positional arguments:
     account               Name of the account to get jobcharges for. "accounts" command can be used to list your valid accounts.
   
   optional arguments:
     -h, --help            show this help message and exit
     -s STARTTIME, --starttime STARTTIME
                           Get jobcharges after this time. Default is one month before the current time.
     -e ENDTIME, --endtime ENDTIME
                           Get jobcharges before this time. Default is the current time.
     --detail              detail output, per-job
     -m MONTH, --month MONTH
                           Get jobcharges for a specific month (1-12). Will override start end time arguments
     -y YEAR, --year YEAR  Get jobcharges for a specific year. Will override start end time arguments
     -d DAYSBACK, --daysback DAYSBACK
                           Get jobcharges from the previous N days. Will take precedence over all other time search arguments

.. raw:: html

   </details>
|

Refunds
----------

Refunds are considered, when appropriate, for jobs that failed due to circumstances beyond user control.

To request a refund, :ref:`submit a support request <help>`. Please include the batch job IDs and the standard error and output files produced by the job(s).
