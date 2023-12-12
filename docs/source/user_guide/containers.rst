.. _contain:

Containers
==============

Apptainer (formerly Singularity)
--------------------------------

Container support on Delta is provided by Apptainer.

Docker images can be converted to Singularity sif format via the `singularity pull <https://docs.sylabs.io/guides/3.2/user-guide/cli/singularity_pull.html#singularity-pull>`_ command. 
Commands can be run from within a container using the `singularity run <https://docs.sylabs.io/guides/3.2/user-guide/cli/singularity_run.html#singularity-run>`_ command (or ``apptainer run``).

If you encounter quota issues with Apptainer caching in **~/.singularity**, the environment variable ``SINGULARITY_CACHEDIR`` can be used to use a different location such as a scratch space.

Your **$HOME** is automatically available from containers run via Apptainer. 
You can ``pip3 install --user`` against a container's python, setup virtual environments, or similar while using a containerized application. 
Just run the container's /bin/bash to get an Apptainer> prompt (or use ``apptainer shell <container>`` for a quick look from a login node). 
Below is an ``srun`` example of that with TensorFlow:

.. code-block::

   $ srun \
    --mem=32g \
    --nodes=1 \
    --ntasks-per-node=1 \
    --cpus-per-task=16 \
    --partition=gpuA100x4-interactive \
    --account=bbka-delta-gpu \
    --gpus-per-node=1 \
    --gpus-per-task=1 \
    --gpu-bind=verbose,per_task:1 \
    --pty \
    apptainer run --nv --bind /projects/bbXX \
    /sw/external/NGC/tensorflow:22.06-tf2-py3 /bin/bash
   # job starts ...
   Apptainer> hostname
   gpua068.delta.internal.ncsa.edu
   Apptainer> which python  # the python in the container
   /usr/bin/python
   Apptainer> python --version
   Python 3.8.10

.. _nvidia-contain:

NVIDIA NGC Containers
---------------------

Delta provides NVIDIA NGC Docker containers that are pre-built with Apptainer. Look for the latest binary containers in **/sw/external/NGC/** . 
The containers are used as shown in the sample scripts below:

PyTorch Example Script
~~~~~~~~~~~~~~~~~~~~~~

.. code-block::

   #!/bin/bash
   #SBATCH --mem=64g
   #SBATCH --nodes=1
   #SBATCH --ntasks-per-node=1
   #SBATCH --cpus-per-task=16     # <- match to OMP_NUM_THREADS, 64 requests whole node
   #SBATCH --partition=gpuA100x4 # <- one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
   #SBATCH --account=bbka-delta-gpu
   #SBATCH --job-name=pytorchNGC
   ### GPU options ###
   #SBATCH --gpus-per-node=1
   #SBATCH --gpus-per-task=1
   #SBATCH --gpu-bind=verbose,per_task:1

   module reset # drop modules and explicitly load the ones needed
                # (good job metadata and reproducibility)
                # $WORK and $SCRATCH are now set
   module list  # job documentation and metadata

   echo "job is starting on `hostname`"

   # run the container binary with arguments: python3 <program.py>
   # --bind /projects/bbXX  # add to apptainer arguments to mount directory inside container
   apptainer run --nv \
    /sw/external/NGC/pytorch:22.02-py3 python3 tensor_gpu.py

TensorFlow Example Script
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block::

   #!/bin/bash
   #SBATCH --mem=64g
   #SBATCH --nodes=1
   #SBATCH --ntasks-per-node=1
   #SBATCH --cpus-per-task=16     # <- match to OMP_NUM_THREADS
   #SBATCH --partition=gpuA100x4 # <- one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
   #SBATCH --account=bbka-delta-gpu
   #SBATCH --job-name=tfNGC
   ### GPU options ###
   #SBATCH --gpus-per-node=1
   #SBATCH --gpus-per-task=1
   #SBATCH --gpu-bind=verbose,per_task:1

   module reset # drop modules and explicitly load the ones needed
                # (good job metadata and reproducibility)
                # $WORK and $SCRATCH are now set
   module list  # job documentation and metadata

   echo "job is starting on `hostname`"

   # run the container binary with arguments: python3 <program.py>
   # --bind /projects/bbXX  # add to apptainer arguments to mount directory inside container
   apptainer run --nv \
    /sw/external/NGC/tensorflow:22.06-tf2-py3 python3 \
    tf_matmul.py

Container list (as of March, 2022)
----------------------------------

.. code-block::

   caffe:20.03-py3 caffe2:18.08-py3
   catalog.txt
   cntk:18.08-py3
   cp2k_v9.1.0.sif
   cuquantum-appliance_22.03-cirq.sif
   digits:21.09-tensorflow-py3
   gromacs_2022.1.sif
   hpc-benchmarks:21.4-hpl
   lammps:patch_4May2022
   matlab:r2021b
   mxnet:21.09-py3
   mxnet_22.08-py3.sif
   namd_2.13-multinode.sif
   namd_3.0-alpha11.sif
   paraview_egl-py3-5.9.0.sif
   pytorch:22.02-py3
   pytorch_22.07-py3.sif
   pytorch_22.08-py3.sif
   tensorflow_19.09-py3.sif
   tensorflow:22.02-tf1-py3
   tensorflow:22.02-tf2-py3
   tensorflow_22.05-tf1-py3.sif
   tensorflow_22.05-tf2-py3.sif
   tensorflow:22.06-tf1-py3
   tensorflow:22.06-tf2-py3
   tensorflow_22.07-tf2-py3.sif
   tensorflow_22.08-tf1-py3.sif
   tensorflow_22.08-tf2-py3.sif
   tensorrt:22.02-py3
   tensorrt_22.08-py3.sif
   theano:18.08
   torch:18.08-py2

See the `NVIDIA containers catalog <https://catalog.ngc.nvidia.com/containers>`_ for more information.

AMD Infinity Hub containers for MI100
-------------------------------------

The AMD node in partition gpuMI100x8 (-interactive) will run containers from the `AMD Infinity Hub <https://www.amd.com/en/technologies/infinity-hub>`_.
The Delta team has pre-loaded the following containers in **/sw/external/MI100** and will retrieve others upon request.

AMD MI100 Containers in /sw/external/MI100
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block::

   cp2k_8.2.sif
   gromacs_2021.1.sif
   lammps_2021.5.14_121.sif
   milc_c30ed15e1-20210420.sif
   namd_2.15a2-20211101.sif
   namd3_3.0a9.sif
   openmm_7.7.0_49.sif
   pytorch_rocm5.0_ubuntu18.04_py3.7_pytorch_1.10.0.sif
   tensorflow_rocm5.0-tf2.7-dev.sif

Sample Batch Script for PyTorch 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block::

   #!/bin/bash
   #SBATCH --mem=64g
   #SBATCH --nodes=1
   #SBATCH --ntasks-per-node=1
   #SBATCH --cpus-per-task=16
   #SBATCH --partition=gpuMI100x8
   #SBATCH --account=bbka-delta-gpu
   #SBATCH --job-name=tfAMD
   #SBATCH --reservation=amd
   #SBATCH --time=00:15:00
   ### GPU options ###
   #SBATCH --gpus-per-node=1
   ##SBATCH --gpus-per-task=1
   ##SBATCH --gpu-bind=none     # <- or closest

   module purge # drop modules and explicitly load the ones needed
                # (good job metadata and reproducibility)

   module list  # job documentation and metadata

   echo "job is starting on `hostname`"

   # https://apptainer.org/docs/user/1.0/gpu.html#amd-gpus-rocm
   # https://pytorch.org/docs/stable/notes/hip.html
   time \
   apptainer run --rocm \
    ~arnoldg/delta/AMD/pytorch_rocm5.0_ubuntu18.04_py3.7_pytorch_1.10.0.sif \
    python3 tensor_gpu.py

   exit

Other Containers
----------------

Extreme-scale Scientific Software Stack (E4S)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The E4S container with GPU (CUDA and ROCm) support is provided for users of specific Exascale Computing Project (ECP) packages made available by the `E4S project <https://e4s-project.github.io/>`_. The Singularity image is available as:

.. code-block::

   /sw/external/E4S/e4s-gpu-x86_64.sif

To use E4S with NVIDIA GPUs:

.. code-block::

   $ srun --account=account_name --partition=gpuA100-interactive \
     --nodes=1 --gpus-per-node=1 --tasks=1 --tasks-per-node=1 \
     --cpus-per-task=16 --mem=28g \
     --pty bash
   $ singularity exec --cleanenv /sw/external/E4S/e4s-gpu-x86_64.sif \
     /bin/bash --rcfile /etc/bash.bashrc

The Spack package inside of the image will interact with a local Spack installation. 
If ~/.spack directory exists, it might need to be renamed.

More information can be found on the `E4S containers page <https://e4s-project.github.io/download.html>`_.
