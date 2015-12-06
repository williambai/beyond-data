process = waitbar(0,'��ʼ�ھ�...');
file_list = dir(fullfile('Data/all/*.txt'));
file_length = length(file_list);
basepath = 'Data/all/'; %�����ļ�����Ŀ¼
ref_date = '2015-11-20'; %�ο�����,���ڱȽϹ�Ʊ������ݵ������Ա��жϸù��Ƿ�ͣ��,ʹ��ʱ��Ϊ���һ������������
suspension_stock = []; %��ͣ�ƵĹ�Ʊ
WANTED = [];%��KDJѡ���Ĺ�Ʊ
for i = drange(1:file_length)
    filename = file_list(i).name;
    filepath = strcat(basepath,filename);
    S = importdata(filepath);
    last_date = S.textdata(end,1); %���һ�����ݵ�����
    if strcmp(last_date,ref_date)
        s_close = S.data(:,3);
        s_low = S.data(:,4);
        s_high = S.data(:,2);
        s_kdj = KDJ(9,s_close,s_low,s_high);
        k = s_kdj(end,1);
        d = s_kdj(end,2);
        j = s_kdj(end,3);
        if (j>=k && k>=d && j<30)
            WANTED = [WANTED;filename];
        end
    else
        suspension_stock = [suspension_stock;filename];
    end
    waitbar(i/file_length,process,'�����ھ�...');
end
close(process);
    
    