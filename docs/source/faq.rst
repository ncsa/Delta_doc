.. _faq:

Frequently Asked Questions
============================

How do I log into Delta?
--------------------------

Log into the Delta login nodes via Secure Shell (SSH) using your NCSA username, password, and NCSA Duo MFA. See :ref:`access` for more information, including the login node hostnames.

How do I request access to Delta?
----------------------------------

Most Delta compute resource allocations are awarded through the ACCESS program.

See the `Delta Allocations <https://delta.ncsa.illinois.edu/delta-allocations/>`_ page to learn more about the different allocation methods and how to submit an allocation request to each.

How do I get help if I can’t find the answer in the documentation?
---------------------------------------------------------------------

If you can’t find the answer in the documentation (or via the search bar in the upper left corner), :ref:`submit a support request <help>`. The ticket that is initiated becomes a discussion of your problem and the path to a solution.

How do I acknowledge Delta, NCSA, and/or ACCESS in my research?
------------------------------------------------------------------

See `Delta Citations <https://delta.ncsa.illinois.edu/delta-citations/>`_ for information on how to acknwoledge Delta or NCSA, and `Acknowledging ACCESS <https://access-ci.org/about/acknowledging-access/>`_ for information on how to acknowledge ACCESS.

What causes "ImportError: /lib64/libstdc++.so.6: version GLIBCXX_3.x.x not found"?
-------------------------------------------------------------------------------------

This can result from bringing software onto Delta that was not built on the system using the system programming modules.  You can usually work around this by setting: 

.. code-block:: terminal

   export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$LIBRARY_PATH

Why does nvidia-smi not find a gpu?
------------------------------------
You are running the command on a cpu-only compute node OR on one of the login nodes.  Only the gpu nodes contain Nvidia gpus and they are accessible via the slurm batch system.  See: `Running Jobs <https://docs.ncsa.illinois.edu/systems/delta/en/latest/user_guide/running_jobs.html/>`_
