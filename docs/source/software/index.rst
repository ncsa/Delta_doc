Installed Software
======================

Delta software is provisioned, when possible, using Spack to produce modules for use via the lmod based module system. 
Select NVIDIA NGC containers are made available (see the container section) and are periodically updated from the NVIDIA NGC site. 
An automated list of available software can be found on the ACCESS website.

.. _module:

Modules/Lmod
-----------------

Delta provides two sets of modules and a variety of compilers in each set. 
The default environment is **modtree/gpu** which loads a recent version of gnu compilers, the openmpi implementation of MPI, and CUDA.
The environment with GPU support will build binaries that run on both the GPU nodes (with CUDA) and CPU nodes (potentially with warning messages because those nodes lack CUDA drivers). 
For situations where the same version of software is to be deployed on GPU and CPU nodes but with separate builds, the **modtree/cpu** environment provides the same default compiler and MPI but without CUDA. 
Use module spider package_name to search for software in Lmod and see the steps to load it for your environment.

+----------------------------------+--------------------------------------------------------------------------------------+
| Module (Lmod) Command            | Example                                                                              |
+==================================+======================================================================================+
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

See also: `User Guide for Lmod <https://lmod.readthedocs.io/en/latest/010_user.html>`_.

Please open a service request ticket (link to Help) for help with software not currently installed on the Delta system. 

For single user or single project use cases the preference is for the user to use the Spack software package manager to install software locally against the system Spack installation. 
Delta support staff are available to provide limited assistance. 

For general installation requests, the Delta project office will review requests for broad use and installation effort.

Intel AI Analytics Toolkit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Intel AI Analytics Toolkit (AI Kit) module contains a subset of what you will find in anaconda_cpu. 
It contains conda environments optimized for CPU execution: PyTorch & TensorFlow. 
We have seen up to 2x speedup when using the AI Kit compared to the stock anaconda_cpu. 
For best results, set OMP_NUM_THREADS to the number of cores you'd like to use ( --cpus-per-task in Slurm). 
See also: https://www.intel.com/content/www/us/en/developer/tools/oneapi/ai-analytics-toolkit.html.

anaconda3_gpu (for CUDA) , anaconda3_mi100 (for ROCm)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Similar to the setup for anaconda_cpu, Delta has GPU versions of anaconda3 (module load anaconda3_gpu) and installed PyTorch and TensorFlow
CUDA aware python modules into these versions. 
You may use these modules when working with the GPU nodes. 
See *conda list* after loading the module to review what is already installed. 
As with anaconda3_cpu, notify Delta staff if there are generally useful modules you would like installed for the broader community. 
A sample TensorFlow test script:

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

.. _jupyter:

Jupyter Notebooks
~~~~~~~~~~~~~~~~~~~

The Detla Open OnDemand portal provides an easier way to start a Jupyter notebook. Please see Open OnDemand to access the portal.

The Jupyter notebook executables are in your ``$PATH`` after loading the anaconda3 module. 
**Do not run Jupyter on the shared login nodes.**
Instead, follow these steps to attach a Jupyter notebook running on a compute node to your local web browser:

#. Start a Jupyter job via srun and note the hostname (*you pick the port number for --port*).

   | **srun Jupyter ( anaconda3_cpu on a CPU node ):**
   
   .. code-block::
      
      $ srun --account=wxyz-delta-cpu --partition=cpu-interactive \
        --time=00:30:00 --mem=32g \
        jupyter-notebook --no-browser \
        --port=8991 --ip=0.0.0.0
      ...
          Or copy and paste one of these URLs:
              http://cn093.delta.internal.ncsa.edu:8891/?token=e5b500e5aef67b1471ed1842b2676e0c0ae4b5652656feea
           or http://127.0.0.1:8991/?token=e5b500e5aef67b1471ed1842b2676e0c0ae4b5652656feea

   Note the internal hostname in the cluster for step 2. You will use the second URL in step 3.

   When using a container with a GPU node, run the container's jupyter-notebook:

   | **NGC container for GPUs, jupyter-notebook, bind a directory:**

   .. code-block::

      # container notebook example showing how to access a directory outside
      # of $HOME ( /projects/bbka in the example )
      $ srun --account=wxyz-delta-gpu --partition=gpuA100x4-interactive \
        --time=00:30:00 --mem=64g --gpus-per-node=1 \
        singularity run --nv --bind /projects/bbka \
        /sw/external/NGC/pytorch:22.02-py3 jupyter-notebook \
        --notebook-dir /projects/wxyz \
        --no-browser --port=8991 --ip=0.0.0.0
      ...
      http://hostname:8888/?token=73d96b99f2cfc4c3932a3433d1b8003c052081c5411795d5

   In step 3, to start the notebook in your browser, replace http://hostname:8888/ with http://127.0.0.1:8991/ (the port number you selected with --port=)

   You may not see the job hostname when running with a container, find it with squeue:

   | **squeue -u $USER:**

   .. code-block::

      $ squeue -u $USER
                   JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
                  156071 gpuA100x4 singular  arnoldg  R       1:00      1 gpua045

   Then specify the host your job is using in the next step (gpua045, for example).

#. From your local desktop or laptop create an SSH tunnel to the compute node via a login node of Delta.

   | **SSH tunnel for Jupyter:**

   .. code-block::

      $ ssh -l my_delta_username \
        -L 127.0.0.1:8991:cn093.delta.internal.ncsa.edu:8991 \
        dt-login.delta.ncsa.illinois.edu

   Authenticate with your login and 2-factor as usual.

#. Paste the second URL (containing 127.0.0.1:port_number and the token string) from step 1 into your browser and you will be connected to the Jupyter instance running on your compute node of Delta.

   .. image:: jupyter_screenshot.jpg
      :alt: Jupyter screenshot
      :width: 700

   .. image:: jupyter_logo.png
      :alt: Jupyter logo

Python (a recent or latest version)
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

If you do not need all of the extra modules provided by Anaconda, use the basic python installation under the gcc module. 
You can add modules via "*pip3 install --user <modulename>*", `setup virtual environments <https://packaging.python.org/en/latest/tutorials/installing-packages/>`_, and customize, as needed, for your workflow starting from a smaller installed base of python than Anaconda.

.. code-block::

   $ module load gcc python
   $ which python
   /sw/spack/delta-2022-03/apps/python/3.10.4-gcc-11.2.0-3cjjp6w/bin/python
   $ module list

   Currently Loaded Modules:
     1) modtree/gpu   3) gcc/11.2.0    5) ucx/1.11.2      7) python/3.10.4
     2) default       4) cuda/11.6.1   6) openmpi/4.1.2

This is the list of modules available in python from "pip3 list":

.. code-block::

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

Python
----------
.. toctree::
   :maxdepth: 2
   
   python/index
   python_env/index
   
