USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ProductType_SelectAll]    Script Date: 11/18/2022 3:12:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Gideon Macapagal
-- Create date: 10/19/2022
-- Description: ProductType SelectAll
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[ProductType_SelectAll]

AS
/*

EXECUTE [dbo].[ProductType_SelectAll]

*/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[ProductType]

END


GO
