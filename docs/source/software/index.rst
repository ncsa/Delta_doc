Installed Software
======================

Delta software is provisioned, when possible, using spack to produce
modules for use via the lmod based module system. Select NVIDIA NGC
containers are made available (see the container section below) and are
periodically updated from the NVIDIA NGC site. An automated list of
available software can be found on the ACCESS website.

modules/lmod
-----------------

Delta provides two sets of modules and a variety of compilers in each
set. The default environment is **modtree/gpu** which loads a recent
version of gnu compilers , the openmpi implementation of MPI, and cuda.
The environment with gpu support will build binaries that run on both
the gpu nodes (with cuda) and cpu nodes (potentially with warning
messages because those nodes lack cuda drivers). For situations where
the same version of software is to be deployed on both gpu and cpu nodes
but with separate builds, the **modtree/cpu** environment provides the
same default compiler and MPI but without cuda. Use module spider
package_name to search for software in lmod and see the steps to load it
for your environment.

+----------------------------------+--------------------------------------------------------------------------------------+
| module (lmod) command            | example                                                                              |
+----------------------------------+--------------------------------------------------------------------------------------+
|                                  |                                                                                      |
|                                  |   .. code-block::                                                                    |
| module list                      |                                                                                      |
|                                  |      $ module list                                                                   |
| (display the currently loaded    |                                                                                      |
| modules)                         |      Currently Loaded Modules:                                                       |
|                                  |      1) gcc/11.2.0   3) openmpi/4.1.2   5) modtree/gpu                               |
|                                  |      2) ucx/1.11.2   4) cuda/11.6.1                                                  |
|                                  |                                                                                      |
|                                  |                                                                                      |
+----------------------------------+--------------------------------------------------------------------------------------+
| module load <package_name>       |                                                                                      |
|                                  |   .. code-block::                                                                    |
| (loads a package or metamodule   |                                                                                      |
| such as modtree/gpu or netcdf-c) |      $ module load modtree/cpu                                                       |
|                                  |                                                                                      |
|                                  |      Due to MODULEPATH changes, the following have been reloaded:                    |
|                                  |      1) gcc/11.2.0     2) openmpi/4.1.2     3) ucx/1.11.2                            |
|                                  |                                                                                      |
|                                  |      The following have been reloaded with a version change:                         |
|                                  |      1) modtree/gpu => modtree/cpu                                                   |
|                                  |                                                                                      |
+----------------------------------+--------------------------------------------------------------------------------------+
| module spider <package_name>     |                                                                                      |
|                                  |   .. code-block::                                                                    |
| (finds modules and displays the  |                                                                                      |
| ways to load them)               |      $ module spider openblas                                                        |
|                                  |                                                                                      |
|                                  |      ---------------------------------------------------------------------------     |
|                                  |      openblas: openblas/0.3.20                                                       |
|                                  |      ----------------------------------------------------------------------------    |
|                                  |      You will need to load all module(s) on any one of the lines below before the    |
|                                  |      "openblas/0.3.20" module is available to load.                                  |
| module -r spider "regular        |                                                                                      |
| expression"                      |            aocc/3.2.0                                                                |
|                                  |            gcc/11.2.0                                                                |
|                                  |                                                                                      |
|                                  |         Help:                                                                        |
|                                  |           OpenBLAS: An optimized BLAS library                                        |
|                                  |      $ module -r spider "^r$"                                                        |
|                                  |                                                                                      |
|                                  |      ----------------------------------------------------------------------------    |
|                                  |        r:                                                                            |
|                                  |      ----------------------------------------------------------------------------    |
|                                  |          Versions:                                                                   |
|                                  |             r/4.1.                                                                   |
|                                  |      ...                                                                             |
|                                  |                                                                                      |
+----------------------------------+--------------------------------------------------------------------------------------+

see also: `User Guide for Lmod <https://lmod.readthedocs.io/en/latest/010_user.html>`_.

Please open a service request ticket by sending email to
help@ncsa.illinois.edu for help with software not currently installed on
the Delta system. For single user or single project use cases the
preference is for the user to use the spack software package manager to
install software locally against the system spack installation as
documented <here>. Delta support staff are available to provide limited
assistance. For general installation requests the Delta project office
will review requests for broad use and installation effort.

Intel_AI_toolkit
~~~~~~~~~~~~~~~~~

The Intel AI toolkit module contains a subset of what you'll find in
anaconda_cpu. It contains conda environments optimized for cpu
execution: pytorch & tensorflow. We have seen up to 2x speedup when
using the Intel_AI_toolkit compared to the stock anaconda_cpu. For best
results, set OMP_NUM_THREADS to the number of cores you'd like to use (
--cpus-per-task in slurm ). See also: https://www.intel.com/content/www/us/en/developer/tools/oneapi/ai-analytics-toolkit.html.

anaconda3_gpu (for cuda) , anaconda3_mi100 (for rocm)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Similar to the setup for anaconda_cpu, we have gpu versions of anaconda3
(module load anaconda3_gpu) and have installed pytorch and tensorflow
cuda aware python modules into these versions. You may use these module
when working with the gpu nodes. See *conda list* after loading the
module to review what is already installed. As with anaconda3_cpu, let
Delta staff know if there are generally useful modules you would like us
to try to install for the broader community. A sample tensorflow test
script:

.. code-block::

   #!/bin/bash
   #SBATCH --mem=64g
   #SBATCH --nodes=1
   #SBATCH --ntasks-per-node=1
   #SBATCH --cpus-per-task=16     # <- match to OMP_NUM_THREADS
   #SBATCH --partition=gpuA100x4-interactive
   #SBATCH --time=00:10:00
   #SBATCH --account=YOUR_ACCOUNT-delta-gpu
   #SBATCH --job-name=tf_anaconda
   ### GPU options ###
   #SBATCH --gpus-per-node=1
   #SBATCH --gpus-per-task=1
   #SBATCH --gpu-bind=verbose,per_task:1
   ###SBATCH --gpu-bind=none     # <- or closest

   module purge # drop modules and explicitly load the ones needed
                # (good job metadata and reproducibility)

   module load anaconda3_gpu
   module list  # job documentation and metadata

   echo "job is starting on `hostname`"

   which python3
   conda list tensorflow
   srun python3 \
     tf_gpu.py
   exit

Jupyter notebooks
~~~~~~~~~~~~~~~~~~~

The Detla Open OnDemand portal provides an easier way to start a Jupyter
notebook. Please see to access the portal.

The jupyter notebook executables are in your $PATH after loading the
anaconda3 module. *Don't run jupyter on the shared login nodes.*
Instead, follow these steps to attach a jupyter notebook running on a
compute node to your local web browser:

+-----------------------+---------------------------------------------------------------------------------------------------------------+
| 1) Start a jupyter    |  srun jupyter ( anaconda3_cpu on a cpu node ):                                                                |
| job via srun and note |                                                                                                               |
| the hostname (*you    |  .. code-block::                                                                                              |
| pick the port number  |                                                                                                               |
| for --port*).         |     $ srun --account=wxyz-delta-cpu --partition=cpu-interactive \                                             |
|                       |       --time=00:30:00 --mem=32g \                                                                             |
|                       |       jupyter-notebook --no-browser \                                                                         |
|                       |       --port=8991 --ip=0.0.0.0                                                                                |
|                       |     ...                                                                                                       |
|                       |         Or copy and paste one of these URLs:                                                                  |
|                       |             http://cn093.delta.internal.ncsa.edu:8891/?token=e5b500e5aef67b1471ed1842b2676e0c0ae4b5652656feea |
|                       |          or http://127.0.0.1:8991/?token=e5b500e5aef67b1471ed1842b2676e0c0ae4b5652656feea                     |
|                       |                                                                                                               |
|                       |  Use the 2nd URL in step 3.  Note the internal hostname in the cluster for step 2.                            |
|                       |                                                                                                               |
|                       |  When using a container with a gpu node, run the container's jupyter-notebook:                                |
|                       |                                                                                                               |
|                       |  NGC container for gpus, jupyter-notebook, bind a directory                                                   |
|                       |                                                                                                               |
|                       |  .. code-block::                                                                                              |
|                       |                                                                                                               |
|                       |     # container notebook example showing how to access a directory outside                                    |
|                       |     # of $HOME ( /projects/bbka in the example )                                                              |
|                       |     $ srun --account=wxyz-delta-gpu --partition=gpuA100x4-interactive \                                       |
|                       |       --time=00:30:00 --mem=64g --gpus-per-node=1 \                                                           |
|                       |       singularity run --nv --bind /projects/bbka \                                                            |
|                       |       /sw/external/NGC/pytorch:22.02-py3 jupyter-notebook \                                                   |
|                       |       --notebook-dir /projects/wxyz \                                                                         |
|                       |       --no-browser --port=8991 --ip=0.0.0.0                                                                   |
|                       |     ...                                                                                                       |
|                       |     http://hostname:8888/?token=73d96b99f2cfc4c3932a3433d1b8003c052081c5411795d5                              |
|                       |                                                                                                               |
|                       |  In step 3 to start the notebook in your browser, replace http://hostname:8888/ with http://127.0.0.1:8991/   |
|                       |    ( the port number you selected with --port= )                                                              |
|                       |                                                                                                               |
|                       |  You may not see the job hostname when running with a container, find it with squeue:                         |
|                       |                                                                                                               |
|                       |  squeue -u $USER                                                                                              |
|                       |                                                                                                               |
|                       |  .. code-block::                                                                                              |
|                       |                                                                                                               |
|                       |     $ squeue -u $USER                                                                                         |
|                       |                  JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)                      |
|                       |                 156071 gpuA100x4 singular  arnoldg  R       1:00      1 gpua045                               |
|                       |                                                                                                               |
|                       |  Then specify the host your job is using in the next step (gpua045 for example ).                             |
|                       |                                                                                                               |
|                       |                                                                                                               |
+-----------------------+---------------------------------------------------------------------------------------------------------------+
| 2) From your local    |                                                                                                               |
| desktop or laptop     |  ssh tunnel for jupyter                                                                                       |
| create an ssh tunnel  |                                                                                                               |
| to the compute node   |  .. code-block::                                                                                              |
| via a login node of   |                                                                                                               |
| delta.                |     $ ssh -l my_delta_username \                                                                              |
|                       |       -L 127.0.0.1:8991:cn093.delta.internal.ncsa.edu:8991 \                                                  |
|                       |       dt-login.delta.ncsa.illinois.edu                                                                        |
|                       |                                                                                                               |
|                       |  Authenticate with your login and 2-factor as usual.                                                          |
|                       |                                                                                                               |
+-----------------------+---------------------------------------------------------------------------------------------------------------+
| 3) Paste the 2nd      |                                                                                                               |
|    URL (containing    |                                                                                                               |
|    127.0.0.1:         |                                                                                                               |
|    *port_number*      |                                                                                                               |
|    and the token      |                                                                                                               |
|    string) from step  |                                                                                                               |
|    1 into your        |                                                                                                               |
|    browser and you    |                                                                                                               |
|    will be connected  |                                                                                                               |
|    to the jupyter     |                                                                                                               |
|    instance running   |                                                                                                               |
|    on your compute    |                                                                                                               |
|    node of Delta.     |                                                                                                               |
+-----------------------+---------------------------------------------------------------------------------------------------------------+

Python (a recent or latest version)
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

If you do not need all of the extra modules provided by Anaconda, use
the basic python installation under the gcc module. You can add modules
via "*pip3 install --user <modulename>*", `setup virtual
environments <https://packaging.python.org/en/latest/tutorials/installing-packages/>`__,
and customize as needed for your workflow but starting from a smaller
installed base of python than Anaconda.

::

   $ module load gcc python
   $ which python
   /sw/spack/delta-2022-03/apps/python/3.10.4-gcc-11.2.0-3cjjp6w/bin/python
   $ module list

   Currently Loaded Modules:
     1) modtree/gpu   3) gcc/11.2.0    5) ucx/1.11.2      7) python/3.10.4
     2) default       4) cuda/11.6.1   6) openmpi/4.1.2

This is the list of modules available in the python from "pip3 list":

::

   Package            Version
   ------------------ ---------
   certifi            2021.10.8
   cffi               1.15.0
   charset-normalizer 2.0.12
   click              8.1.2
   cryptography       36.0.2
   globus-cli         3.4.0
   globus-sdk         3.5.0
   idna               3.3
   jmespath           0.10.0
   pip                22.0.4
   pycparser          2.21
   PyJWT              2.3.0
   requests           2.27.1
   setuptools         58.1.0
   urllib3            1.26.9

R
-------------------------
.. toctree::
   :maxdepth: 2
   
   python/index
   python_env/index
   R/index
   
