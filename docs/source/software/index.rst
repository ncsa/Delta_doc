Installed Software
======================

Delta software is provisioned, when possible, using spack to produce
modules for use via the lmod based module system. Select NVIDIA NGC
containers are made available (see the container section below) and are
periodically updated from the NVIDIA NGC site. An automated list of
available software can be found on the ACCESS website.

modules/lmod lmod
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

+----------------------------------+----------------------------------+
| module (lmod) command            | example                          |
+----------------------------------+----------------------------------+
| .. container:: content-wrapper   | .. container:: content-wrapper   |
|                                  |                                  |
|    module list                   |    |                             |
|                                  |                                  |
|    (display the currently loaded |    ::                            |
|    modules)                      |                                  |
|                                  |       $ module list              |
|    |                             |                                  |
|                                  |       Currently Loaded Modules:  |
|                                  |         1) gcc/11.2.0   3        |
|                                  | ) openmpi/4.1.2   5) modtree/gpu |
|                                  |                                  |
|                                  |   2) ucx/1.11.2   4) cuda/11.6.1 |
|                                  |                                  |
|                                  |    |                             |
+----------------------------------+----------------------------------+
| module load <package_name>       | .. container:: content-wrapper   |
|                                  |                                  |
| (loads a package or metamodule   |    |                             |
| such as modtree/gpu or netcdf-c) |                                  |
|                                  |    ::                            |
|                                  |                                  |
|                                  |       $ module load modtree/cpu  |
|                                  |                                  |
|                                  |                                  |
|                                  |     Due to MODULEPATH changes, t |
|                                  | he following have been reloaded: |
|                                  |         1) gcc/11.2.0     2)     |
|                                  |  openmpi/4.1.2     3) ucx/1.11.2 |
|                                  |                                  |
|                                  |       The following have been    |
|                                  |  reloaded with a version change: |
|                                  |                                  |
|                                  |    1) modtree/gpu => modtree/cpu |
|                                  |                                  |
|                                  |    |                             |
+----------------------------------+----------------------------------+
| module spider <package_name>     | .. container:: content-wrapper   |
|                                  |                                  |
| (finds modules and displays the  |    |                             |
| ways to load them)               |                                  |
|                                  |    ::                            |
| |                                |                                  |
|                                  |       $ module spider openblas   |
| module -r spider "regular        |                                  |
| expression"                      |       ------------               |
|                                  | -------------------------------- |
|                                  | -------------------------------- |
|                                  |                                  |
|                                  |        openblas: openblas/0.3.20 |
|                                  |       ------------               |
|                                  | -------------------------------- |
|                                  | -------------------------------- |
|                                  |                                  |
|                                  |           You will nee           |
|                                  | d to load all module(s) on any o |
|                                  | ne of the lines below before the |
|                                  |        "openblas/0.3.            |
|                                  | 20" module is available to load. |
|                                  |                                  |
|                                  |             aocc/3.2.0           |
|                                  |             gcc/11.2.0           |
|                                  |                                  |
|                                  |           Help:                  |
|                                  |             Ope                  |
|                                  | nBLAS: An optimized BLAS library |
|                                  |       $ module -r spider "^r$"   |
|                                  |                                  |
|                                  |       ------------               |
|                                  | -------------------------------- |
|                                  | -------------------------------- |
|                                  |         r:                       |
|                                  |       ------------               |
|                                  | -------------------------------- |
|                                  | -------------------------------- |
|                                  |            Versions:             |
|                                  |               r/4.1.3            |
|                                  |       ...                        |
|                                  |                                  |
|                                  |    |                             |
+----------------------------------+----------------------------------+

see also: `User Guide for
Lmod <https://lmod.readthedocs.io/en/latest/010_user.html>`__

Please open a service request ticket by sending email to
help@ncsa.illinois.edu for help with software not currently installed on
the Delta system. For single user or single project use cases the
preference is for the user to use the spack software package manager to
install software locally against the system spack installation as
documented <here>. Delta support staff are available to provide limited
assistance. For general installation requests the Delta project office
will review requests for broad use and installation effort.

Python
-------------------------



R
-------------------------
.. toctree::
   :maxdepth: 2
   
   python/index
   python_env/index
   R/index
   
