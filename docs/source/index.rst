################################################
Delta User Documentation
################################################

..  image:: images/delta_front.png
    :alt: 12 racks in a machine room, with overhead power, with red to orange "DELTA" wrap on the rack doors.  
    :width: 700px

Introduction
=============

Delta is a dedicated, `ACCESS <https://access-ci.org>`_-allocated resource designed by HPE and NCSA, delivering a highly capable GPU-focused compute environment for GPU and CPU workloads.  
In addition to offering a mix of standard and reduced precision GPU resources, Delta also offers GPU-dense nodes with both NVIDIA and AMD GPUs.  
Delta provides high performance node-local SSD scratch filesystems, as well as both standard Lustre and relaxed-POSIX parallel filesystems spanning the entire resource.

Envisioned to lead change across the dimensions of computing, storage, and usability, Delta employs standards-based, fully customized science gateways with per-domain interfaces provided alongside the traditional command-line batch system interface. 
Enabled science gateways seamlessly integrate Delta into the cyberinfrastructure ecosystem alongside other resources to enable complex, multi-system workflows. 
To advance applications, the Delta project team continues the applications-focused, outcomes-oriented approach to drive the transition to GPU-accelerated applications alongside gateway-based productivity advances. 
Integrated with the NSF's Advanced Cyberinfrastructure Coordination Ecosystem: Services & Support (ACCESS) ecosystems, Delta leverages the substantial portfolio of services and support offered therein and together deliver unprecedented advances in researcher productivity.

Delta supports the `ACCESS core software stack <https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/pages/72421302>`_, including remote login, remote computation, data movement, science workflow support, and science gateway support toolkits.

Status Updates and Notices
============================

- Current outage information: https://support.access-ci.org/outages
- ACCESS infrastructure news (outage and reconfiguration news): https://operations.access-ci.org/infrastructure_news
- ACCESS Delta Affinity Group site with links to news and the Slack channel for users: https://support.access-ci.org/affinity-groups/delta

Getting Started with High-Performance Computing
================================================

**There are no specific prerequisite courses or high-performance computing (HPC) experience required before using Delta.** However, if you are unfamiliar with using an HPC cluster, it is highly recommended that you take NCSA’s short tutorial `Using an HPC Cluster for Scientific Applications <https://www.hpc-training.org/xsede/moodle/enrol/index.php?id=71>`_ before continuing.

You can also browse the full list of NCSA's `HPC-Moodle Self-Paced Tutorials <https://www.hpc-training.org/xsede/moodle/course/index.php?categoryid=11>`_ to learn more about other HPC topics.

.. toctree::
   :maxdepth: 2
   :hidden:

   status_updates
   quick_start
   faq
   support_services
   help

.. toctree::
   :maxdepth: 2
   :caption: User Guide
   :hidden:
   
   user_guide/architecture
   accounts/index
   user_guide/accessing
   user_guide/citizenship
   user_guide/data_mgmt
   user_guide/prog_env
   running_jobs/index
   software/index
   visualization
   user_guide/containers
   services/index
   debug_perf/index
   user_guide/acknowledge
   
