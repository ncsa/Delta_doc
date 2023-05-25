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

On Delta, you may install your own python software stacks as needed.
There are a couple choices when customizing your python setup. You may
*use any of these methods* with any of the python versions or instances
described below (or you may install your own python versions):

#. `venv (python virtual
   environment) <https://docs.python.org/3/library/venv.html>`__

   #. can name environments (metadata) and have multiple environments
      per python version or instance

#. `conda
   environments <https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html>`__

   #. similar to venv but with more flexibility , see this
      `comparison <https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html>`__
      (1/2 way down the page)

#. `pip3 <https://docs.python.org/3/installing/index.html>`__ : pip3
   install --user <python_package>

   #. useful when you need just 1 python environment per python version
      or instance

A couple examples using all of the above are shown at this site covering
scikit-learn-intelex (an Intel accelerated scikit learn subset library
for x86_64 architecture) :
https://github.com/intel/scikit-learn-intelex/blob/master/INSTALL.md

NGC containers for gpu nodes

The Nvidia NGC containers on Delta provide optimized python frameworks
built for Delta's A100 and A40 gpus. Delta staff recommend using an NGC
container when possible with the gpu nodes (or use the anaconda3_gpu
module described later).

The default gcc (latest version) programming environment for either
modtree/cpu or modtree/gpu contains:

Anaconda
~~~~~~~~

anaconda3_cpu
^^^^^^^^^^^^^

Use python from the anaconda3_cpu module if you need some of the modules
provided by Anaconda in your python workflow. See the "`managing
environments <https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html#managing-environments>`__"
section of the Conda getting started guide to learn how to customize
Conda for your workflow and add extra python modules to your
environment. We recommend starting with anaconda3_cpu for modtree/cpu
and the cpu nodes, do not use this module with gpus, use anaconda3_gpu
instead. The Delta team frequently updates anaconda3_\* to track the
latest packages.

anaconda and containers

If you use anaconda with NGC containers, take care to use the python
from the container and not the python from anaconda or one of its
environments. The container's python should be 1st in $PATH. You may
--bind the anaconda directory or other paths into the container so that
you can start your conda environments, but with the container's python
(/usr/bin/python).

| 

older versions of python and modules

https://repo.anaconda.com/archive/ contains previous Anaconda versions.
The bundles are not small, but using one from Anaconda would ensure that
you get software that was built to work together at a point in time. If
you require an older version of a python lib/module, we suggest looking
back in time at the Anaconda site.

| 

::

   $ module load modtree/cpu
   $ module load gcc anaconda3_cpu
   $ which conda
   /sw/external/python/anaconda3_cpu/conda
   $ module list Currently Loaded Modules:
     1) cue-login-env/1.0   6) libfabric/1.14.0     11) ucx/1.11.2
     2) default             7) lustre/2.14.0_ddn23  12) openmpi/4.1.2
     3) gcc/11.2.0          8) openssh/8.0p1        13) modtree/cpu
     4) knem/1.1.4          9) pmix/3.2.3           14) anaconda3_cpu/4.13.0
     5) libevent/2.1.8     10) rdma-core/32.0

List of modules in anaconda3_cpu
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The current list of modules available in anaconda3_cpu is shown via
"conda list", including tensorflow, pytorch, etc:

::

   # packages in environment at /sw/external/python/anaconda3_cpu: # Name                    Version                   Build  Channel
   _ipyw_jlab_nb_ext_conf    0.1.0            py39h06a4308_1
   _libgcc_mutex             0.1                        main
   _openmp_mutex             4.5                       1_gnu
   absl-py                   1.1.0                    pypi_0    pypi
   aiobotocore               2.3.3                    pypi_0    pypi
   aiohttp                   3.8.1            py39h7f8727e_1
   aioitertools              0.10.0                   pypi_0    pypi
   aiosignal                 1.2.0              pyhd3eb1b0_0
   alabaster                 0.7.12             pyhd3eb1b0_0
   anaconda                  2022.05                  py39_0
   anaconda-client           1.9.0            py39h06a4308_0
   anaconda-navigator        2.1.4            py39h06a4308_0
   anaconda-project          0.10.2             pyhd3eb1b0_0
   anyio                     3.5.0            py39h06a4308_0
   appdirs                   1.4.4              pyhd3eb1b0_0
   argon2-cffi               21.3.0             pyhd3eb1b0_0
   argon2-cffi-bindings      21.2.0           py39h7f8727e_0
   arrow                     1.2.2              pyhd3eb1b0_0
   astroid                   2.6.6            py39h06a4308_0
   astropy                   5.0.4            py39hce1f21e_0
   asttokens                 2.0.5              pyhd3eb1b0_0
   astunparse                1.6.3                    pypi_0    pypi
   async-timeout             4.0.1              pyhd3eb1b0_0
   atomicwrites              1.4.0                      py_0
   attrs                     21.4.0             pyhd3eb1b0_0
   automat                   20.2.0                     py_0
   autopep8                  1.6.0              pyhd3eb1b0_0
   awscli                    1.25.14                  pypi_0    pypi
   babel                     2.9.1              pyhd3eb1b0_0
   backcall                  0.2.0              pyhd3eb1b0_0
   backports                 1.1                pyhd3eb1b0_0
   backports.functools_lru_cache 1.6.4              pyhd3eb1b0_0
   backports.tempfile        1.0                pyhd3eb1b0_1
   backports.weakref         1.0.post1                  py_1
   bcrypt                    3.2.0            py39he8ac12f_0
   beautifulsoup4            4.11.1           py39h06a4308_0
   binaryornot               0.4.4              pyhd3eb1b0_1
   bitarray                  2.4.1            py39h7f8727e_0
   bkcharts                  0.2              py39h06a4308_0
   black                     19.10b0                    py_0
   blas                      1.0                         mkl
   bleach                    4.1.0              pyhd3eb1b0_0
   blosc                     1.21.0               h8c45485_0
   bokeh                     2.4.2            py39h06a4308_0
   boto3                     1.21.32            pyhd3eb1b0_0
   botocore                  1.24.21                  pypi_0    pypi
   bottleneck                1.3.4            py39hce1f21e_0
   brotli                    1.0.9                he6710b0_2
   brotlipy                  0.7.0           py39h27cfd23_1003
   brunsli                   0.1                  h2531618_0
   bzip2                     1.0.8                h7b6447c_0
   c-ares                    1.18.1               h7f8727e_0
   ca-certificates           2022.3.29            h06a4308_1
   cachetools                4.2.2              pyhd3eb1b0_0
   certifi                   2021.10.8        py39h06a4308_2
   cffi                      1.15.0           py39hd667e15_1
   cfitsio                   3.470                hf0d0db6_6
   chardet                   4.0.0           py39h06a4308_1003
   charls                    2.2.0                h2531618_0
   charset-normalizer        2.0.4              pyhd3eb1b0_0
   click                     8.0.4            py39h06a4308_0
   cloudpickle               2.0.0              pyhd3eb1b0_0
   clyent                    1.2.2            py39h06a4308_1
   colorama                  0.4.4              pyhd3eb1b0_0
   colorcet                  2.0.6              pyhd3eb1b0_0
   conda                     4.13.0           py39h06a4308_0
   conda-build               3.21.8           py39h06a4308_2
   conda-content-trust       0.1.1              pyhd3eb1b0_0
   conda-env                 2.6.0                         1
   conda-pack                0.6.0              pyhd3eb1b0_0
   conda-package-handling    1.8.1            py39h7f8727e_0
   conda-repo-cli            1.0.4              pyhd3eb1b0_0
   conda-token               0.3.0              pyhd3eb1b0_0
   conda-verify              3.4.2                      py_1
   constantly                15.1.0             pyh2b92418_0
   cookiecutter              1.7.3              pyhd3eb1b0_0
   cpuonly                   2.0                           0    pytorch-nightly
   cryptography              3.4.8            py39hd23ed53_0
   cssselect                 1.1.0              pyhd3eb1b0_0
   curl                      7.82.0               h7f8727e_0
   cycler                    0.11.0             pyhd3eb1b0_0
   cython                    0.29.28          py39h295c915_0
   cytoolz                   0.11.0           py39h27cfd23_0
   daal4py                   2021.5.0         py39h78b71dc_0
   dal                       2021.5.1           h06a4308_803
   dask                      2022.2.1           pyhd3eb1b0_0
   dask-core                 2022.2.1           pyhd3eb1b0_0
   dataclasses               0.8                pyh6d0b6a4_7
   datashader                0.13.0             pyhd3eb1b0_1
   datashape                 0.5.4            py39h06a4308_1
   dbus                      1.13.18              hb2f20db_0
   debugpy                   1.5.1            py39h295c915_0
   decorator                 5.1.1              pyhd3eb1b0_0
   defusedxml                0.7.1              pyhd3eb1b0_0
   diff-match-patch          20200713           pyhd3eb1b0_0
   dill                      0.3.5.1                  pypi_0    pypi
   distributed               2022.2.1           pyhd3eb1b0_0
   docutils                  0.16                     pypi_0    pypi
   entrypoints               0.4              py39h06a4308_0
   et_xmlfile                1.1.0            py39h06a4308_0
   etils                     0.7.1                    pypi_0    pypi
   executing                 0.8.3              pyhd3eb1b0_0
   expat                     2.4.4                h295c915_0
   ffmpeg                    4.2.2                h20bf706_0
   filelock                  3.6.0              pyhd3eb1b0_0
   flake8                    3.9.2              pyhd3eb1b0_0
   flask                     1.1.2              pyhd3eb1b0_0
   flatbuffers               1.12                     pypi_0    pypi
   fontconfig                2.13.1               h6c09931_0
   fonttools                 4.25.0             pyhd3eb1b0_0
   freetype                  2.11.0               h70c0345_0
   frozenlist                1.2.0            py39h7f8727e_0
   fsspec                    2022.5.0                 pypi_0    pypi
   funcx                     1.0.2                    pypi_0    pypi
   funcx-common              0.0.15                   pypi_0    pypi
   future                    0.18.2           py39h06a4308_1
   gast                      0.4.0                    pypi_0    pypi
   gensim                    4.1.2            py39h295c915_0
   giflib                    5.2.1                h7b6447c_0
   glib                      2.69.1               h4ff587b_1
   glob2                     0.7                pyhd3eb1b0_0
   globus-cli                3.8.0                    pypi_0    pypi
   globus-sdk                3.11.0                   pypi_0    pypi
   gmp                       6.2.1                h2531618_2
   gmpy2                     2.1.2            py39heeb90bb_0
   gnutls                    3.6.15               he1e5248_0
   google-api-core           1.25.1             pyhd3eb1b0_0
   google-auth               1.33.0             pyhd3eb1b0_0
   google-auth-oauthlib      0.4.6                    pypi_0    pypi
   google-cloud-core         1.7.1              pyhd3eb1b0_0
   google-cloud-storage      1.31.0                     py_0
   google-crc32c             1.1.2            py39h27cfd23_0
   google-pasta              0.2.0                    pypi_0    pypi
   google-resumable-media    1.3.1              pyhd3eb1b0_1
   googleapis-common-protos  1.53.0           py39h06a4308_0
   greenlet                  1.1.1            py39h295c915_0
   grpcio                    1.42.0           py39hce63b2e_0
   gst-plugins-base          1.14.0               h8213a91_2
   gstreamer                 1.14.0               h28cd5cc_2
   gviz-api                  1.10.0                   pypi_0    pypi
   h5py                      3.6.0            py39ha0f2276_0
   hdf5                      1.10.6               hb1b8bf9_0
   heapdict                  1.0.1              pyhd3eb1b0_0
   holoviews                 1.14.8             pyhd3eb1b0_0
   hvplot                    0.7.3              pyhd3eb1b0_1
   hyperlink                 21.0.0             pyhd3eb1b0_0
   icu                       58.2                 he6710b0_3
   idna                      3.3                pyhd3eb1b0_0
   imagecodecs               2021.8.26        py39h4cda21f_0
   imageio                   2.9.0              pyhd3eb1b0_0
   imagesize                 1.3.0              pyhd3eb1b0_0
   importlib-metadata        4.11.3           py39h06a4308_0
   importlib-resources       5.9.0                    pypi_0    pypi
   importlib_metadata        4.11.3               hd3eb1b0_0
   incremental               21.3.0             pyhd3eb1b0_0
   inflection                0.5.1            py39h06a4308_0
   iniconfig                 1.1.1              pyhd3eb1b0_0
   intake                    0.6.5              pyhd3eb1b0_0
   intel-openmp              2021.4.0          h06a4308_3561
   intervaltree              3.1.0              pyhd3eb1b0_0
   ipykernel                 6.9.1            py39h06a4308_0
   ipython                   8.2.0            py39h06a4308_0
   ipython_genutils          0.2.0              pyhd3eb1b0_1
   ipywidgets                7.6.5              pyhd3eb1b0_1
   isort                     5.9.3              pyhd3eb1b0_0
   itemadapter               0.3.0              pyhd3eb1b0_0
   itemloaders               1.0.4              pyhd3eb1b0_1
   itsdangerous              2.0.1              pyhd3eb1b0_0
   jax                       0.3.16                   pypi_0    pypi
   jaxlib                    0.3.15                   pypi_0    pypi
   jdcal                     1.4.1              pyhd3eb1b0_0
   jedi                      0.18.1           py39h06a4308_1
   jeepney                   0.7.1              pyhd3eb1b0_0
   jinja2                    2.11.3             pyhd3eb1b0_0
   jinja2-time               0.2.0              pyhd3eb1b0_3
   jmespath                  0.10.0             pyhd3eb1b0_0
   joblib                    1.1.0              pyhd3eb1b0_0
   jpeg                      9e                   h7f8727e_0
   jq                        1.6               h27cfd23_1000
   json5                     0.9.6              pyhd3eb1b0_0
   jsonschema                4.4.0            py39h06a4308_0
   jupyter                   1.0.0            py39h06a4308_7
   jupyter_client            6.1.12             pyhd3eb1b0_0
   jupyter_console           6.4.0              pyhd3eb1b0_0
   jupyter_core              4.9.2            py39h06a4308_0
   jupyter_server            1.13.5             pyhd3eb1b0_0
   jupyterlab                3.3.2              pyhd3eb1b0_0
   jupyterlab_pygments       0.1.2                      py_0
   jupyterlab_server         2.10.3             pyhd3eb1b0_1
   jupyterlab_widgets        1.0.0              pyhd3eb1b0_1
   jxrlib                    1.1                  h7b6447c_2
   keras                     2.9.0                    pypi_0    pypi
   keras-preprocessing       1.1.2                    pypi_0    pypi
   keyring                   23.4.0           py39h06a4308_0
   kiwisolver                1.3.2            py39h295c915_0
   krb5                      1.19.2               hac12032_0
   lame                      3.100                h7b6447c_0
   lazy-object-proxy         1.6.0            py39h27cfd23_0
   lcms2                     2.12                 h3be6417_0
   ld_impl_linux-64          2.35.1               h7274673_9
   lerc                      3.0                  h295c915_0
   libaec                    1.0.4                he6710b0_1
   libarchive                3.4.2                h62408e4_0
   libclang                  14.0.1                   pypi_0    pypi
   libcrc32c                 1.1.1                he6710b0_2
   libcurl                   7.82.0               h0b77cf5_0
   libdeflate                1.8                  h7f8727e_5
   libedit                   3.1.20210910         h7f8727e_0
   libev                     4.33                 h7f8727e_1
   libffi                    3.3                  he6710b0_2
   libgcc-ng                 9.3.0               h5101ec6_17
   libgfortran-ng            7.5.0               ha8ba4b0_17
   libgfortran4              7.5.0               ha8ba4b0_17
   libgomp                   9.3.0               h5101ec6_17
   libidn2                   2.3.2                h7f8727e_0
   liblief                   0.11.5               h295c915_1
   libllvm11                 11.1.0               h3826bc1_1
   libnghttp2                1.46.0               hce63b2e_0
   libopus                   1.3.1                h7b6447c_0
   libpng                    1.6.37               hbc83047_0
   libprotobuf               3.19.1               h4ff587b_0
   libsodium                 1.0.18               h7b6447c_0
   libspatialindex           1.9.3                h2531618_0
   libssh2                   1.10.0               h8f2d780_0
   libstdcxx-ng              9.3.0               hd4cf53a_17
   libtasn1                  4.16.0               h27cfd23_0
   libtiff                   4.2.0                h85742a9_0
   libunistring              0.9.10               h27cfd23_0
   libuuid                   1.0.3                h7f8727e_2
   libvpx                    1.7.0                h439df22_0
   libwebp                   1.2.2                h55f646e_0
   libwebp-base              1.2.2                h7f8727e_0
   libxcb                    1.14                 h7b6447c_0
   libxml2                   2.9.12               h03d6c58_0
   libxslt                   1.1.34               hc22bd24_0
   libzopfli                 1.0.3                he6710b0_0
   llvmlite                  0.38.0           py39h4ff587b_0
   locket                    0.2.1            py39h06a4308_2
   lxml                      4.8.0            py39h1f438cf_0
   lz4-c                     1.9.3                h295c915_1
   lzo                       2.10                 h7b6447c_2
   markdown                  3.3.4            py39h06a4308_0
   markupsafe                2.0.1            py39h27cfd23_0
   matplotlib                3.5.1            py39h06a4308_1
   matplotlib-base           3.5.1            py39ha18d171_1
   matplotlib-inline         0.1.2              pyhd3eb1b0_2
   mccabe                    0.6.1            py39h06a4308_1
   mistune                   0.8.4           py39h27cfd23_1000
   mkl                       2021.4.0           h06a4308_640
   mkl-service               2.4.0            py39h7f8727e_0
   mkl_fft                   1.3.1            py39hd3c417c_0
   mkl_random                1.2.2            py39h51133e4_0
   mock                      4.0.3              pyhd3eb1b0_0
   mpc                       1.1.0                h10f8cd9_1
   mpfr                      4.0.2                hb69a4c5_1
   mpi                       1.0                       mpich
   mpich                     3.3.2                hc856adb_0
   mpmath                    1.2.1            py39h06a4308_0
   msgpack-python            1.0.2            py39hff7bd54_1
   multidict                 5.2.0            py39h7f8727e_2
   multipledispatch          0.6.0            py39h06a4308_0
   munkres                   1.1.4                      py_0
   mypy_extensions           0.4.3            py39h06a4308_1
   navigator-updater         0.2.1                    py39_1
   nbclassic                 0.3.5              pyhd3eb1b0_0
   nbclient                  0.5.13           py39h06a4308_0
   nbconvert                 6.4.4            py39h06a4308_0
   nbformat                  5.3.0            py39h06a4308_0
   ncurses                   6.3                  h7f8727e_2
   nest-asyncio              1.5.5            py39h06a4308_0
   nettle                    3.7.3                hbbd107a_1
   networkx                  2.7.1              pyhd3eb1b0_0
   nltk                      3.7                pyhd3eb1b0_0
   nose                      1.3.7           pyhd3eb1b0_1008
   notebook                  6.4.8            py39h06a4308_0
   numba                     0.55.1           py39h51133e4_0
   numexpr                   2.8.1            py39h6abb31d_0
   numpy                     1.21.5           py39he7a7128_1
   numpy-base                1.21.5           py39hf524024_1
   numpydoc                  1.2                pyhd3eb1b0_0
   oauthlib                  3.2.0                    pypi_0    pypi
   olefile                   0.46               pyhd3eb1b0_0
   oniguruma                 6.9.7.1              h27cfd23_0
   openh264                  2.1.1                h4ff587b_0
   openjpeg                  2.4.0                h3ad879b_0
   openpyxl                  3.0.9              pyhd3eb1b0_0
   openssl                   1.1.1n               h7f8727e_0
   opt-einsum                3.3.0                    pypi_0    pypi
   packaging                 21.3               pyhd3eb1b0_0
   pandas                    1.4.2            py39h295c915_0
   pandocfilters             1.5.0              pyhd3eb1b0_0
   panel                     0.13.0           py39h06a4308_0
   param                     1.12.0             pyhd3eb1b0_0
   parsel                    1.6.0            py39h06a4308_0
   parso                     0.8.3              pyhd3eb1b0_0
   partd                     1.2.0              pyhd3eb1b0_1
   patchelf                  0.13                 h295c915_0
   pathspec                  0.7.0                      py_0
   patsy                     0.5.2            py39h06a4308_1
   pcre                      8.45                 h295c915_0
   pep8                      1.7.1            py39h06a4308_0
   pexpect                   4.8.0              pyhd3eb1b0_3
   pickleshare               0.7.5           pyhd3eb1b0_1003
   pillow                    9.0.1            py39h22f2fdc_0
   pip                       21.2.4           py39h06a4308_0
   pkginfo                   1.8.2              pyhd3eb1b0_0
   plotly                    5.6.0              pyhd3eb1b0_0
   pluggy                    1.0.0            py39h06a4308_1
   poyo                      0.5.0              pyhd3eb1b0_0
   prometheus_client         0.13.1             pyhd3eb1b0_0
   prompt-toolkit            3.0.20             pyhd3eb1b0_0
   prompt_toolkit            3.0.20               hd3eb1b0_0
   protego                   0.1.16                     py_0
   protobuf                  3.19.1           py39h295c915_0
   psutil                    5.8.0            py39h27cfd23_1
   ptyprocess                0.7.0              pyhd3eb1b0_2
   pure_eval                 0.2.2              pyhd3eb1b0_0
   py                        1.11.0             pyhd3eb1b0_0
   py-lief                   0.11.5           py39h295c915_1
   pyasn1                    0.4.8              pyhd3eb1b0_0
   pyasn1-modules            0.2.8                      py_0
   pycodestyle               2.7.0              pyhd3eb1b0_0
   pycosat                   0.6.3            py39h27cfd23_0
   pycparser                 2.21               pyhd3eb1b0_0
   pyct                      0.4.6            py39h06a4308_0
   pycurl                    7.44.1           py39h8f2d780_1
   pydantic                  1.10.2                   pypi_0    pypi
   pydispatcher              2.0.5            py39h06a4308_2
   pydocstyle                6.1.1              pyhd3eb1b0_0
   pyerfa                    2.0.0            py39h27cfd23_0
   pyflakes                  2.3.1              pyhd3eb1b0_0
   pygments                  2.11.2             pyhd3eb1b0_0
   pyhamcrest                2.0.2              pyhd3eb1b0_2
   pyjwt                     2.1.0            py39h06a4308_0
   pylint                    2.9.6            py39h06a4308_1
   pyls-spyder               0.4.0              pyhd3eb1b0_0
   pyodbc                    4.0.32           py39h295c915_1
   pyopenssl                 21.0.0             pyhd3eb1b0_1
   pyparsing                 3.0.4              pyhd3eb1b0_0
   pyqt                      5.9.2            py39h2531618_6
   pyrsistent                0.18.0           py39heee7806_0
   pysocks                   1.7.1            py39h06a4308_0
   pytables                  3.6.1            py39h77479fe_1
   pytest                    7.1.1            py39h06a4308_0
   python                    3.9.12               h12debd9_0
   python-dateutil           2.8.2              pyhd3eb1b0_0
   python-fastjsonschema     2.15.1             pyhd3eb1b0_0
   python-libarchive-c       2.9                pyhd3eb1b0_1
   python-lsp-black          1.0.0              pyhd3eb1b0_0
   python-lsp-jsonrpc        1.0.0              pyhd3eb1b0_0
   python-lsp-server         1.2.4              pyhd3eb1b0_0
   python-slugify            5.0.2              pyhd3eb1b0_0
   python-snappy             0.6.0            py39h2531618_3
   pytorch                   1.13.0.dev20220620     py3.9_cpu_0    pytorch-nightly
   pytorch-mutex             1.0                         cpu    pytorch-nightly
   pytz                      2021.3             pyhd3eb1b0_0
   pyviz_comms               2.0.2              pyhd3eb1b0_0
   pywavelets                1.3.0            py39h7f8727e_0
   pyxdg                     0.27               pyhd3eb1b0_0
   pyyaml                    5.4.1                    pypi_0    pypi
   pyzmq                     22.3.0           py39h295c915_2
   qdarkstyle                3.0.2              pyhd3eb1b0_0
   qstylizer                 0.1.10             pyhd3eb1b0_0
   qt                        5.9.7                h5867ecd_1
   qtawesome                 1.0.3              pyhd3eb1b0_0
   qtconsole                 5.3.0              pyhd3eb1b0_0
   qtpy                      2.0.1              pyhd3eb1b0_0
   queuelib                  1.5.0            py39h06a4308_0
   readline                  8.1.2                h7f8727e_1
   regex                     2022.3.15        py39h7f8727e_0
   requests                  2.27.1             pyhd3eb1b0_0
   requests-file             1.5.1              pyhd3eb1b0_0
   requests-oauthlib         1.3.1                    pypi_0    pypi
   ripgrep                   12.1.1                        0
   rope                      0.22.0             pyhd3eb1b0_0
   rsa                       4.7.2              pyhd3eb1b0_1
   rtree                     0.9.7            py39h06a4308_1
   ruamel_yaml               0.15.100         py39h27cfd23_0
   s3fs                      2022.5.0                 pypi_0    pypi
   s3transfer                0.6.0                    pypi_0    pypi
   scikit-image              0.19.2           py39h51133e4_0
   scikit-learn              1.0.2            py39h51133e4_1
   scikit-learn-intelex      2021.5.0         py39h06a4308_0
   scipy                     1.7.3            py39hc147768_0
   scrapy                    2.6.1            py39h06a4308_0
   seaborn                   0.11.2             pyhd3eb1b0_0
   secretstorage             3.3.1            py39h06a4308_0
   send2trash                1.8.0              pyhd3eb1b0_1
   service_identity          18.1.0             pyhd3eb1b0_1
   setuptools                61.2.0           py39h06a4308_0
   sip                       4.19.13          py39h295c915_0
   six                       1.16.0             pyhd3eb1b0_1
   smart_open                5.1.0              pyhd3eb1b0_0
   snappy                    1.1.9                h295c915_0
   sniffio                   1.2.0            py39h06a4308_1
   snowballstemmer           2.2.0              pyhd3eb1b0_0
   sortedcollections         2.1.0              pyhd3eb1b0_0
   sortedcontainers          2.4.0              pyhd3eb1b0_0
   soupsieve                 2.3.1              pyhd3eb1b0_0
   sphinx                    4.4.0              pyhd3eb1b0_0
   sphinxcontrib-applehelp   1.0.2              pyhd3eb1b0_0
   sphinxcontrib-devhelp     1.0.2              pyhd3eb1b0_0
   sphinxcontrib-htmlhelp    2.0.0              pyhd3eb1b0_0
   sphinxcontrib-jsmath      1.0.1              pyhd3eb1b0_0
   sphinxcontrib-qthelp      1.0.3              pyhd3eb1b0_0
   sphinxcontrib-serializinghtml 1.1.5              pyhd3eb1b0_0
   spyder                    5.1.5            py39h06a4308_1
   spyder-kernels            2.1.3            py39h06a4308_0
   sqlalchemy                1.4.32           py39h7f8727e_0
   sqlite                    3.38.2               hc218d9a_0
   stack_data                0.2.0              pyhd3eb1b0_0
   statsmodels               0.13.2           py39h7f8727e_0
   sympy                     1.10.1           py39h06a4308_0
   tabulate                  0.8.9            py39h06a4308_0
   tbb                       2021.5.0             hd09550d_0
   tbb4py                    2021.5.0         py39hd09550d_0
   tblib                     1.7.0              pyhd3eb1b0_0
   tenacity                  8.0.1            py39h06a4308_0
   tensorboard               2.9.1                    pypi_0    pypi
   tensorboard-data-server   0.6.1                    pypi_0    pypi
   tensorboard-plugin-profile 2.8.0                    pypi_0    pypi
   tensorboard-plugin-wit    1.8.1                    pypi_0    pypi
   tensorflow                2.9.1                    pypi_0    pypi
   tensorflow-estimator      2.9.0                    pypi_0    pypi
   tensorflow-io-gcs-filesystem 0.26.0                   pypi_0    pypi
   termcolor                 1.1.0                    pypi_0    pypi
   terminado                 0.13.1           py39h06a4308_0
   testpath                  0.5.0              pyhd3eb1b0_0
   text-unidecode            1.3                pyhd3eb1b0_0
   textdistance              4.2.1              pyhd3eb1b0_0
   threadpoolctl             2.2.0              pyh0d69192_0
   three-merge               0.1.1              pyhd3eb1b0_0
   tifffile                  2021.7.2           pyhd3eb1b0_2
   tinycss                   0.4             pyhd3eb1b0_1002
   tk                        8.6.11               h1ccaba5_0
   tldextract                3.2.0              pyhd3eb1b0_0
   toml                      0.10.2             pyhd3eb1b0_0
   tomli                     1.2.2              pyhd3eb1b0_0
   toolz                     0.11.2             pyhd3eb1b0_0
   torchaudio                0.13.0.dev20220621        py39_cpu    pytorch-nightly
   torchvision               0.14.0.dev20220621        py39_cpu    pytorch-nightly
   tornado                   6.1              py39h27cfd23_0
   tqdm                      4.64.0           py39h06a4308_0
   traitlets                 5.1.1              pyhd3eb1b0_0
   twisted                   22.2.0           py39h7f8727e_0
   typed-ast                 1.4.3            py39h7f8727e_1
   typing-extensions         4.1.1                hd3eb1b0_0
   typing_extensions         4.1.1              pyh06a4308_0
   tzdata                    2022a                hda174b7_0
   ujson                     5.1.0            py39h295c915_0
   unidecode                 1.2.0              pyhd3eb1b0_0
   unixodbc                  2.3.9                h7b6447c_0
   urllib3                   1.26.9           py39h06a4308_0
   w3lib                     1.21.0             pyhd3eb1b0_0
   watchdog                  2.1.6            py39h06a4308_0
   wcwidth                   0.2.5              pyhd3eb1b0_0
   webencodings              0.5.1            py39h06a4308_1
   websocket-client          0.58.0           py39h06a4308_4
   websockets                10.3                     pypi_0    pypi
   werkzeug                  2.0.3              pyhd3eb1b0_0
   wget                      1.21.3               h0b77cf5_0
   wheel                     0.37.1             pyhd3eb1b0_0
   widgetsnbextension        3.5.2            py39h06a4308_0
   wrapt                     1.12.1           py39he8ac12f_1
   wurlitzer                 3.0.2            py39h06a4308_0
   x264                      1!157.20191217       h7b6447c_0
   xarray                    0.20.1             pyhd3eb1b0_1
   xlrd                      2.0.1              pyhd3eb1b0_0
   xlsxwriter                3.0.3              pyhd3eb1b0_0
   xz                        5.2.5                h7b6447c_0
   yaml                      0.2.5                h7b6447c_0
   yapf                      0.31.0             pyhd3eb1b0_0
   yarl                      1.6.3            py39h27cfd23_0
   zeromq                    4.3.4                h2531618_0
   zfp                       0.5.5                h295c915_6
   zict                      2.0.0              pyhd3eb1b0_0
   zipp                      3.7.0              pyhd3eb1b0_0
   zlib                      1.2.12               h7f8727e_2
   zope                      1.0              py39h06a4308_1
   zope.interface            5.4.0            py39h7f8727e_0
   zstd                      1.4.9                haebb681_0    

Intel_AI_toolkit
^^^^^^^^^^^^^^^^

The Intel AI toolkit module contains a subset of what you'll find in
anaconda_cpu. It contains conda environments optimized for cpu
execution: pytorch & tensorflow. We have seen up to 2x speedup when
using the Intel_AI_toolkit compared to the stock anaconda_cpu. For best
results, set OMP_NUM_THREADS to the number of cores you'd like to use (
--cpus-per-task in slurm ). See also:
https://www.intel.com/content/www/us/en/developer/tools/oneapi/ai-analytics-toolkit.html
.

anaconda3_gpu (for cuda) , anaconda3_mi100 (for rocm)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Similar to the setup for anaconda_cpu, we have gpu versions of anaconda3
(module load anaconda3_gpu) and have installed pytorch and tensorflow
cuda aware python modules into these versions. You may use these module
when working with the gpu nodes. See *conda list* after loading the
module to review what is already installed. As with anaconda3_cpu, let
Delta staff know if there are generally useful modules you would like us
to try to install for the broader community. A sample tensorflow test
script:

::

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
^^^^^^^^^^^^^^^^^

The Detla Open OnDemand portal provides an easier way to start a Jupyter
notebook. Please see to access the portal.

The jupyter notebook executables are in your $PATH after loading the
anaconda3 module. *Don't run jupyter on the shared login nodes.*
Instead, follow these steps to attach a jupyter notebook running on a
compute node to your local web browser:

+-----------------------+----------------------------------------------+
| 1) Start a jupyter    | .. container:: content-wrapper               |
| job via srun and note |                                              |
| the hostname (*you    |    |                                         |
| pick the port number  |                                              |
| for --port*).         |    ::                                        |
|                       |                                              |
|                       |       $ srun --account=                      |
|                       | wxyz-delta-cpu --partition=cpu-interactive \ |
|                       |         --time=00:30:00 --mem=32g \          |
|                       |         jupyter-notebook --no-browser \      |
|                       |         --port=8991 --ip=0.0.0.0             |
|                       |       ...                                    |
|                       |                                              |
|                       |         Or copy and paste one of these URLs: |
|                       |               http://cn                      |
|                       | 093.delta.internal.ncsa.edu:8891/?token=e5b5 |
|                       | 00e5aef67b1471ed1842b2676e0c0ae4b5652656feea |
|                       |                                              |
|                       |         or http://127.0.0.1:8991/?token=e5b5 |
|                       | 00e5aef67b1471ed1842b2676e0c0ae4b5652656feea |
|                       |                                              |
|                       |    Use the 2nd URL in step 3. Note the       |
|                       |    internal hostname in the cluster for step |
|                       |    2.                                        |
|                       |                                              |
|                       |    --------------                            |
|                       |                                              |
|                       |    When using a container with a gpu node,   |
|                       |    run the container's jupyter-notebook:     |
|                       |                                              |
|                       |    ::                                        |
|                       |                                              |
|                       |       # container notebook examp             |
|                       | le showing how to access a directory outside |
|                       |                                              |
|                       | # of $HOME ( /projects/bbka in the example ) |
|                       |       $ srun --account=wxyz-d                |
|                       | elta-gpu --partition=gpuA100x4-interactive \ |
|                       |         -                                    |
|                       | -time=00:30:00 --mem=64g --gpus-per-node=1 \ |
|                       |                                              |
|                       | singularity run --nv --bind /projects/bbka \ |
|                       |         /sw/exter                            |
|                       | nal/NGC/pytorch:22.02-py3 jupyter-notebook \ |
|                       |         --notebook-dir /projects/wxyz \      |
|                       |                                              |
|                       |        --no-browser --port=8991 --ip=0.0.0.0 |
|                       |       ...                                    |
|                       |       http://hostname:8888/?token=73d9       |
|                       | 6b99f2cfc4c3932a3433d1b8003c052081c5411795d5 |
|                       |                                              |
|                       |    In step 3 to start the notebook in your   |
|                       |    browser, replace                          |
|                       |    `htt                                      |
|                       | p://hostname:8888/ <http://hostname:8888>`__ |
|                       |    with http://127.0.0.1:*8991/ ( the port   |
|                       |    number you selected with --port= )*       |
|                       |                                              |
|                       |    You may not see the job hostname when     |
|                       |    running with a container, find it with    |
|                       |    squeue:                                   |
|                       |                                              |
|                       |    ::                                        |
|                       |                                              |
|                       |       $ squeue -u $USER                      |
|                       |                                              |
|                       |                  JOBID PARTITION     NAME    |
|                       |   USER ST       TIME  NODES NODELIST(REASON) |
|                       |                   156071 gpuA100x4 si        |
|                       | ngular  arnoldg  R       1:00      1 gpua045 |
|                       |                                              |
|                       |    Then specifu the host your job is using   |
|                       |    in the next step (gpua045 for example ).  |
+-----------------------+----------------------------------------------+
| 2) From your local    | .. container:: content-wrapper               |
| desktop or laptop     |                                              |
| create an ssh tunnel  |    |                                         |
| to the compute node   |                                              |
| via a login node of   |    ::                                        |
| delta.                |                                              |
|                       |       $ ssh -l my_delta_username \           |
|                       |         -L 127.0.0                           |
|                       | .1:8991:cn093.delta.internal.ncsa.edu:8991 \ |
|                       |         dt-login.delta.ncsa.illinois.edu     |
|                       |                                              |
|                       |    Authenticate with your login and 2-factor |
|                       |    as usual.                                 |
+-----------------------+----------------------------------------------+
| .. container::        | .. container:: content-wrapper               |
| content-wrapper       |                                              |
|                       |                                              |
|    3) Paste the 2nd   |                                              |
|    URL (containing    |                                              |
|    12                 |                                              |
| 7.0.0.1:*port_number* |                                              |
|    and the token      |                                              |
|    string) from step  |                                              |
|    1 into your        |                                              |
|    browser and you    |                                              |
|    will be connected  |                                              |
|    to the jupyter     |                                              |
|    instance running   |                                              |
|    on your compute    |                                              |
|    node of Delta.     |                                              |
+-----------------------+----------------------------------------------+

Python (a recent or latest version)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
   
