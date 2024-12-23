Programming Environment (Building Software)
===============================================

The Delta programming environment supports the GNU, AMD (AOCC), Intel and NVIDIA HPC compilers. 
Support for the HPE/Cray Programming environment is forthcoming.

Modules provide access to the compiler + MPI environment.

The default environment includes the GCC 11.4.0 compiler + OpenMPI; nvcc is in the CUDA module and is loaded by default.

AMD recommended compiler flags for GNU, AOCC, and Intel compilers for Milan processors can be found in the `AMD Compiler Options Quick Reference Guide for Epyc 7xx3 processors <https://www.amd.com/system/files/TechDocs/compiler-options-quick-ref-guide-epyc-7xx3-series-processors.pdf>`_.

Serial
----------

To build (compile and link) a serial program in Fortran, C, and C++:

.. table:: Serial Program Commands

   =================== ================= ====================
   GCC                 AOCC              NVHPC
   =================== ================= ====================
   gfortran *myprog*.f flang *myprog*.f  nvfortran *myprog*.f
   gcc *myprog*.c      clang *myprog*.c  nvc *myprog*.c
   g++ *myprog*.cc     clang *myprog*.cc nvc++ *myprog*.cc
   =================== ================= ====================

MPI
-------------------------

To build (compile and link) a MPI program in Fortran, C, and C++:

.. table:: MPI Program Commands

   +---------------------------------+--------------------------------------------+-------------------------------------------+
   | MPI Implementation              | Module Files for                           | Build Commands                            |
   |                                 | MPI/Compiler                               |                                           |
   +=================================+============================================+===========================================+
   |                                 | .. code-block::                            |                                           |
   |                                 |                                            |                                           |
   | OpenMPI                         |    gcc openmpi                             |                                           |
   |                                 |        openmpi/5.0.5+cuda                  | - **Fortran 77:** mpif77 myprog.f         |
   |                                 |        (GPU-direct)                        |                                           |
   |                                 |                                            |                                           |
   | - `Open MPI Home Page`_         | .. code-block::                            |                                           |
   | - `Open MPI Documentation`_     |                                            |                                           |
   |                                 |    aocc openmpi                            | - **Fortran 90:** mpif90 myprog.f90       |
   |                                 |                                            |                                           |
   |                                 | .. code-block::                            |                                           |
   |                                 |                                            |                                           |
   |                                 |    nvhpc openmpi+cuda                      | - **C:** mpicc myprog.c                   |
   |                                 |    (GPU-direct)                            |                                           |
   |                                 |                                            |                                           |
   |                                 | .. code-block::                            | - **C++:** mpic++ myprog.cc               |
   |                                 |                                            |                                           |
   |                                 |    intel openmpi                           |                                           |
   +---------------------------------+--------------------------------------------+-------------------------------------------+
   | Cray MPICH (unsupported)        | .. code-block::                            |                                           |
   |                                 |                                            |                                           |
   |                                 |     PrgEnv-gnu cuda craype-x86-milan \     |                                           |
   |                                 |     craype-accel-ncsa                      | - **Fortran 77:** fortran myprog.f        |
   |                                 |     (GPU-direct)                           |                                           |
   | - PrgEnv-gnu (unsupported)      |                                            | - **Fortran 90:** fortran myprog.f90      |
   |   *or*                          |                                            |                                           |
   | - PrgEnv-cray (unsupported)     |                                            | - **C:** cc myprog.c                      |
   |                                 |                                            |                                           |
   |                                 |                                            |                                           |
   |                                 |                                            | - **C++:** CC myprog.cc                   |
   +---------------------------------+--------------------------------------------+-------------------------------------------+

.. _Open MPI Home Page: http://www.open-mpi.org

.. _Open MPI Documentation: http://www.open-mpi.org/doc

OpenMP
-------------------------

To build an OpenMP program, use the **-fopenmp** / **-mp** option.

.. table:: OpenMP Program Commands

   ================================ ============================ =======================
   GCC                              AOCC                         NVHPC
   ================================ ============================ =======================
   gfortran -fopenmp *myprog*.f     flang -fopenmp *myprog*.f    nvfortran -mp *myprog*.f
   gcc -fopenmp *myprog*.c          clang -fopenmp *myprog*.c    nvc -mp *myprog*.c 
   g++ -fopenmp *myprog*.cc         clang -fopenmp *myprog*.cc   nvc++ -mp *myprog*.cc
   ================================ ============================ =======================

Hybrid MPI/OpenMP
-------------------

To build an MPI/OpenMP hybrid program, use the **-fopenmp** / **-mp** option with the MPI compiling commands.

.. table:: Hybrid MPI/OpenMP Program Commands

   ============================ =======================
   GCC                            PGI/NVHPC
   ============================ =======================
   mpif77 -fopenmp *myprog*.f     mpif77 -mp *myprog*.f
   mpif90 -fopenmp *myprog*.f90   mpif90 -mp *myprog*.f90
   mpicc -fopenmp *myprog*.c      mpicc -mp *myprog*.c
   mpic++ -fopenmp *myprog*.cc    mpic++ -mp *myprog*.cc
   ============================ =======================

Cray xthi.c Sample Code
---------------------------

`Document - XC Series User Application Placement Guide CLE6..0UP01 S-2496 | HPE Support <https://support.hpe.com/hpesc/public/docDisplay?docId=a00114008en_us&page=Run_an_OpenMP_Application.html>`_

This code can be compiled using the methods show above. The code appears in some of the batch script examples below to demonstrate core placement options.

.. code-block::

   #define _GNU_SOURCE

   #include <stdio.h>
   #include <unistd.h>
   #include <string.h>
   #include <sched.h>
   #include <mpi.h>
   #include <omp.h>

   /* Borrowed from util-linux-2.13-pre7/schedutils/taskset.c */
   static char *cpuset_to_cstr(cpu_set_t *mask, char *str)
   {
     char *ptr = str;
     int i, j, entry_made = 0;
     for (i = 0; i < CPU_SETSIZE; i++) {
       if (CPU_ISSET(i, mask)) {
         int run = 0;
         entry_made = 1;
         for (j = i + 1; j < CPU_SETSIZE; j++) {
           if (CPU_ISSET(j, mask)) run++;
           else break;
         }
         if (!run)
           sprintf(ptr, "%d,", i);
         else if (run == 1) {
           sprintf(ptr, "%d,%d,", i, i + 1);
           i++;
         } else {
           sprintf(ptr, "%d-%d,", i, i + run);
           i += run;
         }
         while (*ptr != 0) ptr++;
       }
     }
     ptr -= entry_made;
     *ptr = 0;
     return(str);
   }

   int main(int argc, char *argv[])
   {
     int rank, thread;
     cpu_set_t coremask;
     char clbuf[7 * CPU_SETSIZE], hnbuf[64];

     MPI_Init(&argc, &argv);
     MPI_Comm_rank(MPI_COMM_WORLD, &rank);
     memset(clbuf, 0, sizeof(clbuf));
     memset(hnbuf, 0, sizeof(hnbuf));
     (void)gethostname(hnbuf, sizeof(hnbuf));
     #pragma omp parallel private(thread, coremask, clbuf)
     {
       thread = omp_get_thread_num();
       (void)sched_getaffinity(0, sizeof(coremask), &coremask);
       cpuset_to_cstr(&coremask, clbuf);
       #pragma omp barrier
       printf("Hello from rank %d, thread %d, on %s. (core affinity = %s)\n",
               rank, thread, hnbuf, clbuf);
     }
     MPI_Finalize();
     return(0);
   }

A version of xthi is also available from ORNL:

.. code-block::

   % git clone https://github.com/olcf/XC30-Training/blob/master/affinity/Xthi.c

OpenACC
-------------------------

To build an OpenACC program, use the **-acc** option and the **-mp** option for multi-threaded:

.. table:: OpenACC Program Commands

   ========================= ================================
   Non-Multi-threaded          Multi-threaded
   ========================= ================================
   nvfortran -acc *myprog*.f   nvfortran -acc -mp *myprog*.f
   nvc -acc *myprog*.c         nvc -acc -mp *myprog*.c
   nvc++ -acc *myprog*.cc      nvc++ -acc -mp *myprog*.cc
   ========================= ================================

CUDA
-------------------------

CUDA compilers (nvcc) are included in the CUDA module which is loaded by default under modtree/gpu. For the CUDA Fortran compiler and other NVIDIA development tools, load the **nvhpc** module.

nv* commands when nvhpc is loaded
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block::

   [arnoldg@dt-login03 namd]$ nv
   nvaccelerror             nvidia-bug-report.sh     nvlink
   nvaccelinfo              nvidia-cuda-mps-control  nv-nsight-cu
   nvc                      nvidia-cuda-mps-server   nv-nsight-cu-cli
   nvc++                    nvidia-debugdump         nvprepro
   nvcc                     nvidia-modprobe          nvprof
   nvcpuid                  nvidia-persistenced      nvprune
   nvcudainit               nvidia-powerd            nvsize
   nvdecode                 nvidia-settings          nvunzip
   nvdisasm                 nvidia-sleep.sh          nvvp
   nvextract                nvidia-smi               nvzip
   nvfortran                nvidia-xconfig

See the `NVIDIA HPC SDK <https://developer.nvidia.com/hpc-sdk>`_ page for more information.

Note: The Multi-Process Service (MPS) is not enabled on Delta and there are no plans to support it in the future.  


HIP/ROCm (AMD MI100)
-------------------------

.. note::
   If using hipcc on the login nodes, add **--offload-arch=gfx908** to the flags to match the gpu on the MI100 node.

To access the development environment for the gpuMI100x8 partition, start a job on the node with :ref:`srun` or :ref:`sbatch`. 

Next, set your PATH to prefix /opt/rocm/bin where the HIP and ROCm tools are installed. 

A sample batch script to obtain an xterm (interactive xterm batch script for Slurm) is shown below:

.. code-block::

   #!/bin/bash -x

   MYACCOUNT=$1
   GPUS=--gpus-per-node=1
   PARTITION=gpuMI100x8-interactive
   srun --tasks-per-node=1 --nodes=1 --cpus-per-task=4 \
     --mem=16g \
     --partition=$PARTITION \
     --time=00:30:00 \
     --account=account_name \    # <- match to a "Project" returned by the "accounts" command
     $GPUS --x11 \
     xterm

AMD HIP development environment on gpud01 (setting the path on the compute node):

.. code-block::

   [arnoldg@gpud01 bin]$ export PATH=/opt/rocm/bin:$PATH
   [arnoldg@gpud01 bin]$ hipcc
   No Arguments passed, exiting ...
   [arnoldg@gpud01 bin]$ 

See the `AMD HIP documentation <https://rocmdocs.amd.com/projects/HIP/en/docs-5.0.0/index.html>`_ and `AMD ROCm documentation <https://rocmdocs.amd.com/en/latest/>`_ for more information.
   
Visual Studio Code
---------------------

.. note::
   The Code Server (VS Code) app in Open OnDemand provides an easy method to use VS Code in a web browser.

The following pages provide step-by-step instructions on how to use VS Code, in different configurations, on Delta.

.. toctree::
   :maxdepth: 1

   Code Server (VS Code) App in Open OnDemand <ood/code-server>
   vscode/code_server
   vscode/remote_ssh
   vscode/remote_jupyter
   vscode/performance_issues

|
