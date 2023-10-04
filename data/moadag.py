from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
from datetime import datetime, timedelta

# DAG
default_args = {
    'owner': 'moa',
    'depends_on_past': False,
    'start_date': datetime(2023, 10, 1),
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'crawler_and_analysis',
    default_args=default_args,
    description='Crawl, analyze, and store data',
    schedule_interval='@daily',
    catchup=False,
)

# crawler function
def run_crawler():
    import subprocess

    # crawler command
    cmd = '/usr/bin/python3 /home/ubuntu/dataex/article_crawler.py'
    try:
        subprocess.check_call(cmd, shell=True)
    except subprocess.CalledProcessError as e:
        raise Exception(f"Error running crawler: {str(e)}")

# crawler operator
crawl_task = PythonOperator(
    task_id='run_crawler',
    python_callable=run_crawler,
    dag=dag,
)

# JSON to HDFS
#hdfs_task = HdfsPutFileOperator(
#    task_id='save_to_hdfs',
#    local_file='/home/ubuntu/dataex/article_data.json',
#    remote_file='hdfs://localhost:9000/user/ubuntu/article_data.json',
#    hdfs_conn_id='ubuntu',
#    dag=dag,
#)

# PySpark operator
spark_task = SparkSubmitOperator(
    task_id='run_spark_analysis',
    application='/home/ubuntu/dataex/pysparkex.py',
#    conf={'spark.executor.memory': '2g'},
    dag=dag,
)

# Task dependency
#crawl_task >> hdfs_task >> spark_task
crawl_task >> spark_task
