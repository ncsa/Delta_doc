Installed Software
======================

Delta software is provisioned, when possible, using Spack to produce modules for use via the Lmod based module system. 
Select NVIDIA NGC containers are made available (see :ref:`contain`) and are periodically updated from the NVIDIA NGC site. 
An automated list of available software can be found on the ACCESS website.

.. _module:

Modules/Lmod
-----------------

Delta provides a set of modules and a variety of compilers. The default environment loads gcc and openmpi for CPU programs (no GPU-direct).
Modules supporting NVIDIA GPUs will contain "cuda" in the name of the module, for example, openmpi/4.1.5+cuda.  
Unload cuda when building CPU-only packages to avoid accidentally linking cuda libraries.  
Use ``module spider package_name`` to search for software in Lmod and see the steps to load it in your environment.

.. table:: Module (Lmod) Commands

   +----------------------------------+--------------------------------------------------------------------------------------+
   | Module (Lmod) Command            | Example                                                                              |
   +==================================+======================================================================================+
   |                                  |                                                                                      |
   | .. code-block:: terminal         |   .. code-block::                                                                    |
   |                                  |                                                                                      |
   |    module list                   |      $ module list                                                                   |
   |                                  |                                                                                      |
   | Display the currently loaded     |      Currently Loaded Modules:                                                       |
   | modules.                         |      1) gcc/11.4.0   3) openmpi/4.1.6                                                |
   |                                  |      2) cuda/11.8.0                                                                  |
   |                                  |                                                                                      |
   |                                  |                                                                                      |
   +----------------------------------+--------------------------------------------------------------------------------------+
   | .. code-block:: terminal         |                                                                                      |
   |                                  |                                                                                      |
   |    module load <package_name>    |   .. code-block::                                                                    |
   |                                  |                                                                                      |
   | Loads a package or metamodule    |      $ module load                                                                   |
   | such as netcdf-c.                |                                                                                      |
   |                                  |      Due to MODULEPATH changes, the following have been reloaded:                    |
   |                                  |      1) gcc/11.4.0     2) openmpi/4.1.5                                              |
   |                                  |                                                                                      |
   |                                  |                                                                                      |
   |                                  |                                                                                      |
   +----------------------------------+--------------------------------------------------------------------------------------+
   | .. code-block:: terminal         |                                                                                      |
   |                                  |                                                                                      |
   |    module spider <package_name>  |   .. code-block::                                                                    |
   |                                  |                                                                                      |
   | Finds modules and displays the   |      $ module spider openblas                                                        |
   | ways to load them.               |                                                                                      |
   |                                  |      ---------------------------------------------------------------------------     |
   | |                                |      openblas: openblas/0.3.20                                                       |
   |                                  |      ----------------------------------------------------------------------------    |
   | .. code-block:: terminal         |      You will need to load all module(s) on any one of the lines below before the    |
   |                                  |      "openblas/0.3.20" module is available to load.                                  |
   |    module -r spider "regular     |                                                                                      |
   |    expression"                   |            aocc/3.2.0                                                                |
   |                                  |            gcc/11.2.0                                                                |
   |                                  |                                                                                      |
   |                                  |         Help:                                                                        |
   |                                  |           OpenBLAS: An optimized BLAS library                                        |
   |                                  |                                                                                      |
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

Please :ref:`submit a support request <general_support>` for help with software not currently installed on the Delta system. 

- For single user or single project use cases the preference is for the user to use the Spack software package manager to install software locally against the system Spack installation. 
  Delta support staff are available to provide limited assistance. 
- For general installation requests, the Delta project office will review requests for broad use and installation effort.

.. _delta-python:

Python
----------

.. note::
   When submitting :ref:`support requests <general_support>` for python, please provide the following and understand that Delta support staff time is a finite resource while python developments (new software and modules) are growing at nearly infinite velocity:

   - Python version or environment used (describe fully, with the commands needed to reproduce)
   - Error output or log from what went wrong (screenshots are more difficult to work with than text data)
   - Pertinent URLs describing what you were following/attempting (if applicable), note that URL recipes specific to vendors may be difficult to reproduce when not using their cloud resources (Google Colab, for example)


On Delta, you may install your own python software stacks, as needed. 
There are choices when customizing your python setup. If you anticipate maintaining multiple python environments or installing many packages, you may want to target a filesystem with more quota space (not ``$HOME``) for your environments.  ``/scratch`` or ``/projects`` may be more appropriate in that case.
You may *use any of these methods* with any of the python versions or instances described below (or you may install your own python versions):

- `venv (python virtual environment) <https://docs.python.org/3/library/venv.html>`_

  Can name environments (metadata) and have multiple environments per python version or instance.  pip installs are local to the environment. You specify the path when using venv: ``python -m venv /path/to/env``.

- `conda (or miniconda) environments <https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html>`_

  Similar to venv but with more flexibility, see this `comparison table <https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html#virtual-environments>`_.  See also the miniconda environment option: `anaconda or miniconda <https://docs.anaconda.com/free/distro-or-miniconda/>`_. pip and conda installs are local to the environment and the location defaults to ``$HOME/.conda``. You can override the default location in ``$HOME`` with the ``--prefix`` syntax: ``conda create --prefix /path/to/env``. You can also `relocate your .conda directory to your project space <https://docs.ncsa.illinois.edu/en/latest/common/relocate-conda-directory.html>`_, which has a larger quota than your home directory.

- `pip3 <https://docs.python.org/3/installing/index.html>`_: ``pip3 install --user <python_package>`` 

  CAUTION: Python modules installed this way into your ``$HOME/.local/`` will match on python versions. This can create incompatibilities between containers or python venv or conda environments when they have a common python version number.  You can work around this by using the `PYTHONUSERBASE <https://docs.python.org/3/using/cmdline.html#envvar-PYTHONUSERBASE>`_ environment variable.  That will also allow for shared pip installs if you choose a group-shared directory.

- `conda-env-mod <https://github.com/amaji/conda-env-mod>`_: conda-env-mod lmod module generator from Purdue

  The conda-env-mod script will generate a python module you can load or share with your team. This makes it simpler to manage multiple python scenarios that you can activate and deactivate with module commands.

Examples using all the above are shown in the `Intel scikit-learn-intelex repository <https://github.com/intel/scikit-learn-intelex/blob/master/INSTALL.md>`_ (an Intel accelerated scikit learn subset library for x86_64 architecture). 

- `pyenv <https://github.com/pyenv/pyenv/blob/master/README.md>`_: pyenv python version management

  Pyenv helps you manage multiple python versions.  You can also use more than one python version at once in a project using pyenv.

.. note::
   The :ref:`nvidia-contain` on Delta provide optimized python frameworks built for Delta's A100 and A40 GPUs. 
   Delta staff recommend using an NGC container when possible with the GPU nodes (or use the anaconda3_gpu module).

The default GCC (latest version) programming environment contains:

Python (a recent or latest version)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you don't need all the extra modules provided by Anaconda, use the basic python installation under the gcc module. 
You can add modules via ``pip3 install --user <modulename>``, `setup virtual environments <https://packaging.python.org/en/latest/tutorials/installing-packages/>`_, and customize, as needed, for your workflow starting from a smaller installed base of python than Anaconda.

.. code-block::

   $ module load gcc python
   $ which python
   /sw/spack/deltas11-2023-03/apps/linux-rhel8-zen3/gcc-11.4.0/python-3.12.1-ahcgi2c/bin/python

List of modules available in python from ``pip3 list``:

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

Anaconda
~~~~~~~~~

anaconda3_cpu
$$$$$$$$$$$$$$$

Use python from the anaconda3_cpu module if you need some of the modules provided by Anaconda in your python workflow. 
See the `Managing Environments <https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html#managing-environments>`_ section of the conda getting started guide to learn how to customize conda for your workflow and add extra python modules to your environment. 
NCSA staff recommend starting with anaconda3_cpu for the CPU nodes.
**Do not use this module with GPUs, use anaconda3_gpu instead** (:ref:`anaconda_gpu`).
The Delta team frequently updates anaconda3_* to track the latest packages.

.. note::
   If you use anaconda with NGC containers, take care to use python from the container and not python from Anaconda or one of its environments. 
   The container's python should be first in ``$PATH``. 
   You may ``--bind`` the Anaconda directory or other paths into the container so that you can start your conda environments with the container's python (``/usr/bin/python``).

The `Anaconda archive <https://repo.anaconda.com/archive/>`_ contains previous Anaconda versions.
The bundles are not small, but using one from Anaconda will ensure that you get software that was built to work together. 
If you require an older version of a python lib/module, NCSA staff suggest looking back in time at the Anaconda site.

.. code-block::

   $ 
   $ module load gcc anaconda3_cpu
   $ which conda
   /sw/external/python/anaconda3_cpu/conda

List of modules in anaconda3_cpu
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

The current list of modules available in anaconda3_cpu is shown via ``conda list``, including TensorFlow and PyTorch:

.. raw:: html

   <details>
   <summary><a><b>anaconda3_cpu modules: conda list</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

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

.. raw:: html

   </details>

|

.. _anaconda_gpu:

anaconda3_gpu (for CUDA) , anaconda3_mi100 (for ROCm)
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

Similar to the setup for anaconda_cpu, Delta has GPU versions of anaconda3 (``module load anaconda3_gpu``) and installed PyTorch and TensorFlow CUDA aware python modules into these versions. 
You may use these modules when working with the GPU nodes. 
See ``conda list`` after loading the module to review what is already installed. 
As with anaconda3_cpu, :ref:`submit a support request <general_support>` if there are generally useful modules you would like installed for the broader community. 
A sample TensorFlow test script:

.. code-block:: terminal

   #!/bin/bash
   #SBATCH --mem=64g
   #SBATCH --nodes=1
   #SBATCH --ntasks-per-node=1
   #SBATCH --cpus-per-task=16     # <- match to OMP_NUM_THREADS
   #SBATCH --partition=gpuA100x4-interactive
   #SBATCH --time=00:10:00
   #SBATCH --account=account_name    # <- match to a "Project" returned by the "accounts" command
   #SBATCH --job-name=tf_anaconda
   ### GPU options ###
   #SBATCH --gpus-per-node=1
   #SBATCH --gpus-per-task=1
   #SBATCH --gpu-bind=verbose,per_task:1
   ###SBATCH --gpu-bind=none     # <- or closest

   # expert mode only, most users will not purge all modules
   # module purge # drop modules and explicitly load the ones needed, including cuda
                  # (good job metadata and reproducibility)

   module load anaconda3_gpu
   module list  # job documentation and metadata

   echo "job is starting on `hostname`"

   which python3
   conda list tensorflow
   srun python3 \
     tf_gpu.py
   exit

Python Environments with anaconda3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Recent Changes
$$$$$$$$$$$$$$$$

To address a problem with ``PATH`` ordering when using anaconda3 modules, a warning in the module was put in place to caution loading an anaconda3 module while in a virtual environment, or if ``conda init`` has been used to modify one's environment.

.. code-block::

   (base) [arnoldg@dt-login03 ~]$ module load anaconda3_gpu
   A conda environment has been detected CONDA_PREFIX=
   /sw/external/python/anaconda3 
   anaconda3_gpu is loaded. Consider running conda deactivate and reloading it.

See the `Conda configuration documentation <https://docs.conda.io/projects/conda/en/latest/configuration.html>`_ if you want to disable automatic conda environment activation.

.. note::
   When using your own custom conda environment with a batch job, submit the batch job from within the environment and *do not* add ``conda activate`` commands to the job script; the job inherits your environment.

Batch Jobs
$$$$$$$$$$$

Batch jobs will honor the commands you execute within them.
Purge/unload/load modules as needed for that job.

A clean slate might resemble (user has a conda init clause in bashrc for a custom environment):

.. code-block:: terminal

   conda deactivate
   conda deactivate  # just making sure
   module purge
   module reset  # load the default Delta modules

   conda activate base
   # commands to load modules and activate environs such that your environment is active before
   # you use slurm ( no conda activate commands in the slurm script )
   sbatch myjob.slurm  # or srun or salloc 

Non-python/conda HPC users would see per-job stderr from the ``conda deactivate`` above (user has never run ``conda init bash``):

.. code-block::

   [arnoldg@dt-login03 ~]$ conda deactivate
   bash: conda: command not found
   [arnoldg@dt-login03 ~]$ 

   # or

   [arnoldg@dt-login03 ~]$ conda deactivate

   CommandNotFoundError: Your shell has not been properly configured to use 'conda deactivate'.
   To initialize your shell, run

       $ conda init <SHELL_NAME>

   Currently supported shells are:
     - bash
     - fish
     - tcsh
     - xonsh
     - zsh
     - powershell

   See 'conda init --help' for more information and options.

   IMPORTANT: You may need to close and restart your shell after running 'conda init'.

Intel AI Analytics Toolkit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The `Intel AI Analytics Toolkit (AI Kit) <https://www.intel.com/content/www/us/en/developer/tools/oneapi/ai-analytics-toolkit.html>`_ module contains a subset of what you will find in anaconda_cpu. 
It contains conda environments optimized for CPU execution: PyTorch & TensorFlow. 
We have seen up to 2x speedup when using the AI Kit compared to the stock anaconda_cpu. 
For best results, set ``OMP_NUM_THREADS`` to the number of cores you'd like to use (``--cpus-per-task`` in Slurm).

Containers
~~~~~~~~~~~~

See :ref:`contain`.

.. _jupyter:

Jupyter Notebooks
-------------------

.. note::
   The Delta Open OnDemand (OOD) portal provides an easy method to start a Jupyter notebook; this is the **recommended method**. 

   Go to :ref:`OOD Jupyter interactive app <ood-jupyterlab>` for instructions on how to start an OOD JupyterLab session.

   You can also customize your OOD JupyterLab environment:

     - :ref:`ood-custom-anaconda`
     - :ref:`ood-custom-r` 

**Do not run Jupyter on the shared login nodes.**
Instead, follow these steps to attach a Jupyter notebook running on a compute node to your local web browser:

- :ref:`jupyter-compute-node`
- :ref:`jupyter-compute-node-ngc`

.. _jupyter-compute-node:

How to Run Jupyter on a Compute Node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Jupyter notebook executables are in your ``$PATH`` after loading the ``anaconda3`` module. If you run into problems from a previously saved Jupyter session (for example, you see paths where you do not have write permission), you may remove this file to get a fresh start: ``$HOME/.jupyter/lab/workspaces/default-*``. 

Follow these steps to run Jupyter on a compute node (CPU or GPU):

#. On your local machine/laptop, open a terminal.

#. SSH into Delta. (Replace ``<my_delta_username>`` with your Delta login username).

   .. code-block:: terminal

      ssh <my_delta_username>@login.delta.ncsa.illinois.edu

#. Enter your **NCSA** password and complete the Duo MFA. Note, the terminal will not show your password (or placeholder symbols such as asterisks [*]) as you type.

   .. warning::
      If there is a conda environment active when you log into Delta, deactivate it before you continue. You will know you have an active conda environment if your terminal prompt has an environment name in parentheses prepended to it, like these examples:

      .. code-block::

         (base) [<delta_username>@dt-login01 ~]$

         (mynewenv) [<delta_username>@dt-login01 ~]$

      Run ``conda deactivate`` until there is no longer a name in parentheses prepended to your terminal prompt.  When you don't have any conda environment active, your prompt will look like this:

      .. code-block::

         [<delta_username>@dt-login01 ~]$

#. Load the appropriate anaconda module. To see all of the available anaconda modules, run ``module avail anaconda``. This example uses ``anaconda3_cpu``. 

   .. code-block::

      module load anaconda3_cpu

#. Verify the module is loaded.

   .. code-block::

      module list

#. Verify a jupyter-notebook is in your ``$PATH``.

   .. code-block::

      which jupyter-notebook

#. Generate a ``MYPORT`` number and copy it to a notepad (you will use it in **steps 9 and 12**). 

   .. code-block::

      MYPORT=$(($(($RANDOM % 10000))+49152)); echo $MYPORT

#. Find the the ``account_name`` that you are going to use and copy it to a notepad (you will use it in **step 9**); your accounts are listed under ``Project`` when you run the ``accounts`` command.

   .. note::
      To use a GPU node, you must pick a GPU account (the account name will end in "...-gpu").

   .. code-block::

      accounts

#. Run the following ``srun`` command, with these replacements:

   - Replace ``<account_name>`` with the account you are going to use, which you found and copied in **step 8**.
   - Replace ``<$MYPORT>`` with the ``$MYPORT`` number you generated in **step 7**.
   - Modify the ``--partition``, ``--time``, and ``--mem`` options and/or add other options to meet your needs.

   \

   .. code-block::

      srun --account=<account_name> --partition=cpu-interactive --time=00:30:00 --mem=32g jupyter-notebook --no-browser --port=<$MYPORT> --ip=0.0.0.0

#. Copy the last 5 lines returned beginning with: **"To access the notebook, open this file in a browser..."** to a notepad (you will use this information **steps 12 and 14**). (It may take a few minutes for these lines to be returned.)

   Note these two things about the URLs you copied:

   - The first URL begins with ``http://<cnXXX>.delta...``, ``<cnXXX>`` is the **internal hostname** and will be used in **step 12**.
   - The second URL begins with ``http://127.0...``, you will use this entire URL in **step 14**.

   \

#. Open a second terminal on your local machine/laptop.

#. Run the following ``ssh`` command, with these replacements: 

   - Replace ``<my_delta_username>`` with your Delta login username.
   - Replace ``<$MYPORT>`` with the ``$MYPORT`` number you generated in **step 7**.
   - Replace ``<cn0XX>`` with internal hostname you copied in **step 10**.

   \

   .. code-block::

      ssh -l <my_delta_username> -L 127.0.0.1:<$MYPORT>:<cn0XX>.delta.ncsa.illinois.edu:<$MYPORT> dt-login.delta.ncsa.illinois.edu

#. Enter your **NCSA** password and complete the Duo MFA. Note, the terminal will not show your password (or placeholder symbols such as asterisks [*]) as you type.

#. Copy and paste the entire **second URL** from **step 10** (begins with ``https://127.0...``) into your browser. You will be connected to the Jupyter instance running on your compute node of Delta.

   .. image:: images/software/jupyter_screenshot.jpg
      :alt: Jupyter screenshot
      :width: 700

.. _jupyter-compute-node-ngc:

How to Run Jupyter on a Compute Node, in an NGC Container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow these steps to run Jupyter on a compute node, in an NGC container:

#. On your local machine/laptop, open a terminal.

#. SSH into Delta. (Replace ``<my_delta_username>`` with your Delta login username.)

   .. code-block:: terminal

      ssh <my_delta_username>@login.delta.ncsa.illinois.edu

#. Enter your **NCSA** password and complete the Duo MFA. Note, the terminal will not show your password (or placeholder symbols such as asterisks [*]) as you type.

#. Generate a ``$MYPORT`` number and copy it to a notepad (you will use it in **steps 6, 8, and 14**). 

   .. code-block::

      MYPORT=$(($(($RANDOM % 10000))+49152)); echo $MYPORT

#. Find the the ``account_name`` that you are going to use and copy it to a notepad (you will use it in **step 6**); your accounts are listed under ``Project`` when you run the ``accounts`` command. 

   .. note::
      To use a GPU node, you must pick a GPU account (the account name will end in "...-gpu").

   .. code-block::

      accounts

#. Run the following ``srun`` command, with these replacements: 

   - Replace ``<account_name>`` with the account you are going to use, which you found and copied in step #5. 
   - Replace ``<project_path>`` with the name of your projects folder (in two places).
   - Replace ``<$MYPORT>`` with the ``MYPORT`` number you generated in **step 4**.
   - Modify the ``--partition``, ``--time``, ``--mem``, and ``--gpus-per-node`` options and/or add other options to meet your needs.

   \

   .. code-block::

      srun --account=<account_name> --partition=gpuA100x4-interactive --time=00:30:00 --mem=64g --gpus-per-node=1 apptainer run --nv --bind /projects/<project_path> /sw/external/NGC/pytorch:22.02-py3 jupyter-notebook --notebook-dir /projects/<project_path> --no-browser --port=<$MYPORT> --ip=0.0.0.0

#. Copy the last 2 lines returned (beginning with **"Or copy and paste this URL..."**) to a notepad. (It may take a few minutes for these lines to be returned.)

#. Modify the URL you copied in **step 7** by changing ``hostname:8888`` to ``127.0.0.1:<$MYPORT>``. You will use the modified URL in **step 16**. (Replace ``<$MYPORT>`` with the ``$MYPORT`` number you generated in **step 4**.)

   \

#. Open a second terminal.

#. SSH into Delta. (Replace ``<my_delta_username>`` with your Delta login username.)

   .. code-block:: terminal

      ssh <my_delta_username>@login.delta.ncsa.illinois.edu

#. Enter your **NCSA** password and complete the Duo MFA. Note, the terminal will not show your password (or placeholder symbols such as asterisks [*]) as you type.

#. Find the **internal hostname** for your job and copy it to a notepad (you will use it in **step 14**).

   .. code-block::

      squeue -u $USER

   The value returned under ``NODELIST`` is the internal hostname for your GPU job (``gpuaXXX``). You can now close this terminal.

#. Open a third terminal.

#. Run the following ``ssh`` command, with these replacements: 

   - Replace ``<my_delta_username>`` with your Delta login username.
   - Replace ``<$MYPORT>`` with the ``$MYPORT`` number you generated in **step 4**.
   - Replace ``<gpuaXXX>`` with internal hostname you copied in **step 12**.

   \

   .. code-block::

      ssh -l <my_delta_username> -L 127.0.0.1:<$MYPORT>:<gpuaXXX>.delta.internal.ncsa.edu:<$MYPORT> dt-login.delta.ncsa.illinois.edu

#. Enter your **NCSA** password and complete the Duo MFA. Note, the terminal will not show your password (or placeholder symbols such as asterisks [*]) as you type.

#. Copy and paste the entire **modified URL** (beginning with ``https://127.0...``) from **step 8** into your browser. You will be connected to the Jupyter instance running on your gpu node of Delta.

   .. image:: images/software/jupyter_screenshot.jpg
      :alt: Jupyter screenshot
      :width: 700

MATLAB
---------

There is a **University-wide MATLAB license** linked on Delta; you no longer need to link your own license to use MATLAB on the system. Use ``module avail matlab`` to see the available versions. You can launch MATLAB on a compute node from a terminal on your local machine or in Delta's Open OnDemand Desktop app.

Launch MATLAB from a Terminal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you launch MATLAB from a terminal on your local machine, you can launch it with the Graphical User Interface (GUI) or run it directly in the command line (without the GUI).

Graphical User Interface (GUI)
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

#. To use the GUI, you need to have X11 forwarding enabled. If you did not enable X11 forwarding when you logged in to the system, re-log in and enable it with the following ``ssh`` command. Replace ``username`` with your NCSA username.

   .. code-block:: terminal

      ssh -Y username@login.delta.ncsa.illinois.edu

#. Load the default version of MATLAB (or specify a version) with the ``module load`` command. You can see which versions are available with ``module avail matlab``.

   .. code-block:: terminal

      module load matlab

#. After the MATLAB module loads, run the following ``srun`` command, with modifications. Replace ``account_name`` with the name of an account you have access to on Delta (you can find these by running the ``accounts`` command). Modify the ``time``, ``nodes``, ``partition``, and other variables, as needed.

   .. code-block:: terminal

      srun --x11 --time=00:15:00 --nodes=1 --ntasks-per-node=4 --account=account_name --partition=cpu-interactive --pty /bin/bash

   See :ref:`Running Jobs - Interactive Jobs <interactive-jobs>` for more information about interactive jobs on Delta.

#. After your job starts, run ``matlab`` to launch the MATLAB GUI.

Command Line Interface (no GUI)
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

#. Load the default version of MATLAB (or specify a version) with the ``module load`` command. You can see which versions are available with ``module avail matlab``.

   .. code-block:: terminal

      module load matlab

#. After the MATLAB module loadss, run the following ``srun`` command, with modifications. Replace ``account_name`` with the name of an account you have access to on Delta (you can find these by running the ``accounts`` command). Modify the ``time``, ``nodes``, ``partition``, and other variables, as needed.

   .. code-block:: terminal

      srun --time=00:15:00 --nodes=1 --ntasks-per-node=4 --account=account_name --partition=cpu-interactive --pty /bin/bash

   See :ref:`Running Jobs - Interactive Jobs <interactive-jobs>` for more information about interactive jobs on Delta.

#. After your job starts, run ``matlab -nodisplay`` to launch MATLAB in the command line.

Launch MATLAB from Open OnDemand
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also use MATLAB on Delta through the Open OnDemand Desktop app. 

#. :ref:`Start an OOD Desktop session <ood-start-desktop>`. 
#. In the Desktop app, open a terminal.

   .. figure:: images/software/ood-desktop-terminal.png
      :alt: Open OnDemand Desktop app desktop with the terminal app icon highlighted.
      :width: 500

#. In the terminal, run the following commands to load and run MATLAB. If you want to load a version other than the default, modify your ``module load`` command to load the specific version. You can see which versions are available with ``module avail matlab``.

   .. code-block:: terminal

      # load the matlab module
      module load matlab

      # run matlab
      matlab

List of Installed Software (CPU & GPU)
---------------------------------------

.. raw:: html

   <details>
   <summary><a><b>Delta software module list</b> <i>(click to expand/collapse)</i></a></summary>

The following modules are installed on Delta CPUs, GPUs, or both, as indicated.

.. table:: Delta Installed Modules

   ===============================  ==================
   Module                           CPU, GPU, or both  
   ===============================  ==================
   armadillo                        both
   charmpp                          CPU
   darshan-runtime                  CPU
   fftw                             both
   gromacs                          both
   hdf5                             both
   kokkos                           GPU
   lammps                           CPU
   namd                             CPU
   netcdf-c                         both   
   netcdf-fortran                   both
   osu-micro-benchmarks             GPU
   netlib-scalapack                 CPU
   parallel-netcdf                  both
   parmetis                         GPU
   petsc                            both
   plumed                           both
   anaconda3                        both
   automake                         CPU
   binutils                         CPU
   boost                            both
   cuda                             GPU
   cmake                            CPU
   compositeproto                   CPU
   cutensor                         GPU
   darshan-util                     CPU
   dyninst                          CPU
   elfutils                         CPU
   flex                             CPU
   freeglut                         GPU
   gdal                             CPU
   gettext                          CPU
   glew                             GPU
   gmake                            CPU
   gnuplot                          both
   gsl                              both
   hdf5                             both
   hpctoolkit                       both
   hpcviewer                        CPU
   intel-tbb                        CPU
   intel-xed                        CPU
   knem                             CPU
   libaio                           both
   libdwarf                         CPU
   libevent                         CPU
   libfabric                        CPU
   libiberty                        CPU
   libjpeg                          GPU
   libmonitor                       CPU
   libnsl                           GPU
   libsndfile                       both
   libunwind                        CPU
   libxcb                           GPU
   libxcomposite                    CPU
   libxcrypt                        CPU
   libxkbcommon                     GPU
   libxml2                          CPU
   libxshmfence                     GPU
   libxxf86vm                       GPU
   linux-headers                    CPU
   llvm                             CPU
   lustre                           CPU
   lzma                             CPU
   magma                            GPU
   memkind                          CPU
   mesa                             GPU
   metis                            both
   mpich                            CPU
   muparser                         CPU
   nccl                             GPU
   ncurses                          both
   openblas                         both
   openexr                          GPU
   openjdk                          both
   openmpi                          both
   openssh                          both
   p7zip                            GPU
   papi                             CPU
   perl                             both
   pmix                             CPU
   qt                               CPU
   r                                CPU
   rdma-core                        CPU
   readline                         both
   subversion                       both
   tcl                              CPU
   time                             both
   tk                               CPU
   ucx                              both
   wayland-protocols                GPU
   wayland                          GPU
   xbitmaps                         CPU
   xcb-util-image                   GPU
   xcb-util-keysyms                 GPU
   xcb-util-renderutil              GPU
   xcb-util-wm                      GPU
   xcb-util                         GPU
   xerces-c                         CPU
   xz                               CPU
   yaml-cpp                         CPU
   AMDuProf                         both
   ImageMagick                      both
   Intel_AI_toolkit                 both
   anaconda3_Rcpu                   both
   anaconda3_cpu                    both
   anaconda3_gpu                    both
   anaconda3_mi100                  both
   aws-cli                          both
   cudnn                            both
   cue-login-env                    both
   gurobi                           both
   julia                            both
   lammps                           both
   llvm                             both
   matlab_unlicensed                both
   namd3                            both
   nvhpc_latest                     both
   openmpi-5.0_beta                 both
   openmpi-v5.0.x-202305240344_s11  both
   paraview                         both
   posix2ime                        both
   slurm-env                        both
   visit                            both
   westpa                           both
   accessusage                      both
   aocc                             both
   banner                           GPU
   cmake                            both
   cuda                             GPU
   dos2unix                         both
   gcc                              both
   git                              GPU
   htop                             both
   intel-oneapi-advisor             both
   intel-oneapi-compilers           both
   intel-oneapi-mkl                 both
   libfabric                        GPU
   libffi                           GPU
   libtirpc                         GPU
   modtree                          both
   modtree/cpu                      both
   modtree/gpu                      both
   mpich                            GPU
   ndiff                            both
   nvhpc                            GPU
   nvtop                            GPU
   parallel                         GPU
   subversion                       GPU
   xclock                           both
   zip                              GPU
   lmod                             both
   settarg                          both
   ===============================  ==================

.. raw:: html

   </details>

|
